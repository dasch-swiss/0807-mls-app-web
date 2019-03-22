import { Component, OnInit } from '@angular/core';
import { ReadResource, OntologyInformation, ExtendedSearchParams, KnoraConstants, SearchService, OntologyCacheService, SearchParamsService, GravsearchGenerationService, ApiServiceError, ApiServiceResult, ConvertJSONLD, ReadResourcesSequence } from '@knora/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

export interface ListData {
  title: string;
  description: string;
  content: string;
  showAs: string;
  restrictedBy: string;
  searchMode?: string;
}

declare let require: any;
const jsonld = require('jsonld');

@Component({
  selector: 'mls-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {

  loading: boolean = true;

    result: ReadResource[] = []; // the results of a search query
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`
    numberOfAllResults: number; // total number of results (count query)

    offset = 0;
    gravsearchParams: ExtendedSearchParams;

    KnoraConstants = KnoraConstants;

    list: ListData = {
        title: 'Results: ',
        content: 'resource',
        restrictedBy: ''
    } as ListData;


  constructor(
    private _route: ActivatedRoute,
    private _searchService: SearchService,
    private _cacheService: OntologyCacheService,
    private _searchParamsService: SearchParamsService,
    private _gravSearchService: GravsearchGenerationService,
    private _router: Router){ }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.list.searchMode = params['mode'];

      if (this.list.searchMode === 'fulltext') {
          this.list.restrictedBy = params['q'];
      } else if (this.list.searchMode === 'extended') {
          this.gravsearchParams = this._searchParamsService.getSearchParams();
          const gravsearch: string | boolean = this.gravsearchParams.generateGravsearch(this.offset);
          if (gravsearch === false) {
              // no valid search params (application has been reloaded)
              // go to root
              this._router.navigate([''], {relativeTo: this._route});
              return;
          } else {
              // assign Gravsearch query
              this.list.restrictedBy = <string>gravsearch;
          }
      }

      this.result = [];
      // this.rerender = true;
      this.getResult();
  });
  }

  /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {

      // FULLTEXT SEARCH
      if (this.list.searchMode === 'fulltext') {
          // perform count query
          if (this.offset === 0) {

              this._searchService.doFulltextSearchCountQuery(this.list.restrictedBy)
                  .subscribe(
                      this.showNumberOfAllResults,
                      (error: ApiServiceError) => {
                          console.error(error);
                          // console.log('numberOfAllResults', this.numberOfAllResults);
                      }
                  );
          }

          // perform full text search
          this._searchService.doFulltextSearch(this.list.restrictedBy, this.offset)
              .subscribe(
                  this.processSearchResults, // function pointer
                  (error: ApiServiceError) => {
                      console.error(error);
                  },
              );

          // EXTENDED SEARCH
      } else if (this.list.searchMode === 'extended') {
          // perform count query
          if (this.offset === 0) {
              this._searchService.doExtendedSearchCountQuery(this.list.restrictedBy)
                  .subscribe(
                      this.showNumberOfAllResults,
                      (error: ApiServiceError) => {
                          console.error(error);
                      }
                  );
          }

          // perform the extended search
          this._searchService.doExtendedSearch(this.list.restrictedBy)
              .subscribe(
                  this.processSearchResults, // function pointer
                  (error: ApiServiceError) => {
                      console.error(error);
                  });


      } else {
          console.error('search mode invalid:', this.list.searchMode);
      }
  }


  /**
   * Shows total number of results returned by a count query.
   *
   * @param {ApiServiceResult} countQueryResult the response to a count query.
   */
  private showNumberOfAllResults = (countQueryResult: ApiServiceResult) => {

      const resPromises = jsonld.promises;
      // compact JSON-LD using an empty context: expands all Iris
      const resPromise = resPromises.compact(countQueryResult.body, {});

      resPromise.then((compacted) => {
          this.numberOfAllResults = compacted[KnoraConstants.schemaNumberOfItems];
      }, function (err) {
          console.error('JSONLD could not be expanded:' + err);
      });
  }

  /**
   *
   * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
   * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
   *
   * Attention: this function definition makes uses of the arrow notation because the context of `this` has to be inherited from the context.
   * See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this>
   *
   * @param {ApiServiceResult} searchResult the answer to a search request.
   */
  private processSearchResults = (searchResult: ApiServiceResult) => {

      this.result = [];

      const resPromises = jsonld.promises;
      // compact JSON-LD using an empty context: expands all Iris
      const resPromise = resPromises.compact(searchResult.body, {});

      resPromise.then((compacted) => {

          // get resource class Iris from response
          const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

          // request ontology information about resource class Iris (properties are implied)
          this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
              (resourceClassInfos: OntologyInformation) => {

                  const resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                  // assign ontology information to a variable so it can be used in the component's template
                  if (this.ontologyInfo === undefined) {
                      // init ontology information
                      this.ontologyInfo = resourceClassInfos;
                  } else {
                      // update ontology information
                      this.ontologyInfo.updateOntologyInformation(resourceClassInfos);
                  }
                  // append results to search results
                  this.result = this.result.concat(resources.resources);
                  // console.log(this.result);
                  this.loading = false;

              },
              (err) => {

                  console.error('cache request failed: ' + err);
              }
          );

      }, function (err) {

          console.error('JSONLD could not be expanded:' + err);
      });

  }

  openResource(id: string) {
      const goTo: string = 'resource/' + encodeURIComponent(id);
      this._router.navigate([goTo]);
  }
}
