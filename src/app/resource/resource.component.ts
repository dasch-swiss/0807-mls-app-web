import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReadResourcesSequence, OntologyInformation, KnoraConstants, ResourceService, ApiServiceError, IncomingService, ImageRegion, StillImageRepresentation, ReadResource, ReadStillImageFileValue, ApiServiceResult, ConvertJSONLD, OntologyCacheService } from '@knora/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MlsService } from '../services/mls.service';
import { Subscription } from 'rxjs';

declare let require: any;
const jsonld = require('jsonld');

@Component({
    selector: 'mls-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit, OnDestroy {

    iri: string;
    resource: ReadResource;
    ontologyInfo: OntologyInformation;
    loading = true;
    errorMessage: any;
    KnoraConstants = KnoraConstants;
    navigationSubscription: Subscription;

    constructor(protected _route: ActivatedRoute,
        protected _router: Router,
        protected _resourceService: ResourceService,
        protected _incomingService: IncomingService,
        private _cacheService: OntologyCacheService,
        private _mlsService: MlsService
    ) {
        const routeParams = this._route.snapshot.params;
        this.iri = routeParams.id;
    }

    ngOnInit() {
        this.loading = true;

        this.navigationSubscription = this._route.paramMap.subscribe((params: ParamMap) => {
            this.getResource(params.get('id'));
        });
    }

    ngOnDestroy() {
        if (this.navigationSubscription !== undefined) {
            this.navigationSubscription.unsubscribe();
        }
    }

    private getResource(iri: string): void {
        iri = decodeURIComponent(iri);

        this._resourceService.getResource(iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    const promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        const resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length === 1) {

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
                                    // console.log('resource: ', this.resource);

                                    this.requestIncomingResources();
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

    /**
     * Requests incoming resources for [[this.resource]].
     * Incoming resources are: regions, StillImageRepresentations, and incoming links.
     *
     **/
    private requestIncomingResources(): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) {
            return;
        }

        // check for incoming links for the current resource
        this.getIncomingLinks(0);


    }

    /**
     * Get resources pointing to [[this.resource]] with properties other than knora-api:isPartOf and knora-api:isRegionOf.
     *
     * @param offset the offset to be used (needed for paging). First request uses an offset of 0.
     * It takes the number of images returned as an argument.
     */
    private getIncomingLinks(offset: number): void {

        this._incomingService.getIncomingLinksForResource(this.resource.id, offset).subscribe(
            (incomingResources: ReadResourcesSequence) => {
                // update ontology information
                this.ontologyInfo.updateOntologyInformation(incomingResources.ontologyInformation);

                // Append elements incomingResources to this.resource.incomingLinks
                Array.prototype.push.apply(this.resource.incomingLinks, incomingResources.resources);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.loading = false;
            }
        );
    }

    /**
     * Display incoming links as clickable links
     *
     * @param resIri
     */
    showIncomingRes(resIri) {
        this._router.navigateByUrl('resource/' + encodeURIComponent(resIri));
    }


}
