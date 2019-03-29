import { Injectable } from '@angular/core';
import { AppInitService } from '../app-init.service';

@Injectable({
    providedIn: 'root'
})
export class MlsService {

    constructor(private _appInitService: AppInitService) { }

    /**
     * Gravsearch query to search for lemma data and associated data: location and occupation
     */
    searchForLemmata() {
        const lemmataTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

        CONSTRUCT {
            ?lemma knora-api:isMainResource true .

            #?lemmaLocation mls:hasLLLinkToLemma ?lemma .

            #?lemmaLocation mls:hasLLLinkToLocation ?location .

        } WHERE {
            ?lemma a knora-api:Resource .
            ?lemma a mls:Lemma .

            #?lemmaLocation mls:hasLLLinkToLemma ?lemma .

            #?lemmaLocation mls:hasLLLinkToLocation ?location .

            #?location a mls:Location .

        }
        OFFSET 0
      `;
        return lemmataTemplate;
    }

    /**
     * Gravsearch query to search for lexika data
     */
    searchForLexika() {

        const lexikaTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

        CONSTRUCT {
            ?lexicon knora-api:isMainResource true .


        } WHERE {
            ?lexicon a knora-api:Resource .
            ?lexicon a mls:Lexicon .

        }
        OFFSET 0
      `;
        return lexikaTemplate;

    }

    /**
     * Gravsearch query to search for artikel data
     */
    searchForArtikel() {

        const artikelTemplate = `
     PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
     PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

         CONSTRUCT {
            ?article knora-api:isMainResource true .

         } WHERE {
            ?article a knora-api:Resource .
            ?article a mls:Article .

         }
         OFFSET 0
       `;
        return artikelTemplate;

    }

    /**
     * Gravsearch query to search for bibliothek data
     */
    searchForBibliothek() {

        const bibliothekTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

        CONSTRUCT {
            ?bibliothek knora-api:isMainResource true .

        } WHERE {
            ?bibliothek a knora-api:Resource .
            ?bibliothek a mls:Library .
            
        } 
        OFFSET 0
      `;
        return bibliothekTemplate;

    }

    /**
     * Gravsearch query to search for location data
     */
    searchForOrt() {

        const ortTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

        CONSTRUCT {
            ?ort knora-api:isMainResource true .
            

        } WHERE {

            ?ort a knora-api:Resource .
            ?ort a mls:Location .
            
        } 
        OFFSET 0
      `;
        return ortTemplate;

    }

    /**
     * Gravsearch query to search for occupation data
     */
    searchForTatigkeit() {

        const tatigkeitTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <${this._appInitService.getSettings().ontologyIRI}/ontology/0807/mls/simple/v2#>

        CONSTRUCT {
            ?tatigkeit knora-api:isMainResource true .
            

        } WHERE {

            ?tatigkeit a knora-api:Resource .
            ?tatigkeit a mls:Occupation .
            
        } 
        OFFSET 0
      `;
        return tatigkeitTemplate;

    }

    /********* TESTING *********/

    /** FOR testing only!!!
     * Gravsearch query to search for artikel data
     */
    searchForDing() {

        const artikelTemplate = `PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        CONSTRUCT {

        ?mainRes knora-api:isMainResource true .



        } WHERE {

        ?mainRes a knora-api:Resource .

        ?mainRes a <http://0.0.0.0:3333/ontology/0803/incunabula/simple/v2#page> .



        }

        OFFSET 0
       `;
        return artikelTemplate;

    }


}
