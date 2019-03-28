import { Component, OnInit } from '@angular/core';
import { ReadResourcesSequence, OntologyInformation, KnoraConstants, ResourceService, ApiServiceError, IncomingService, ImageRegion, StillImageRepresentation, ReadResource, ReadStillImageFileValue, ApiServiceResult, ConvertJSONLD, OntologyCacheService } from '@knora/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

declare let require: any;
const jsonld = require('jsonld');

@Component({
    selector: 'mls-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    loading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;

    constructor(protected _route: ActivatedRoute,
        protected _router: Router,
        protected _resourceService: ResourceService,
        protected _incomingService: IncomingService,
        private _cacheService: OntologyCacheService
    ) {
        const routeParams = this._route.snapshot.params;
        this.iri = routeParams.id;
    }

    ngOnInit() {
        this.loading = true;

        /*   this._route.paramMap.subscribe(
              (params: Params) => {
                  this.iri = decodeURIComponent(params.get('id'));
                  console.log(this.iri);
              }
          ); */

        this.getResource(this.iri);
    }

    private getResource(iri: string): void {
        iri = decodeURIComponent(iri);

        this._resourceService.getResource(iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    console.log('result: ', result.body);
                    const promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length === 1) {
                            console.log('1 resource');
                            // get resource class Iris from response
                            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: any) => {
                                    // initialize ontology information
                                    this.ontologyInfo = resourceClassInfos; // console.log('initialization of ontologyInfo: ', this.ontologyInfo); > object received

                                    // prepare a possibly attached image file to be displayed
                                    // this.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];
                                    console.log('resource: ', this.resource);

                                    // this.requestIncomingResources();
                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`;
                        }
                    }, function (err) {
                        console.error('JSONLD of full resource request could not be expanded:' + err);
                    });
                    this.loading = false;
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    // this.errorMessage = <any>error;
                    // this.isLoading = false;
                });
    }

}
