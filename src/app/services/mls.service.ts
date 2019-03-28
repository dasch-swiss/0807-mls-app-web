import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MlsService {

    constructor() { }

    /**
     * Gravsearch query to search for lemma data and associated data: location and occupation
     */
    searchForLemmata() {
        const lemmataTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://0.0.0.0:3333/ontology/0807/mls/simple/v2#>
    
        CONSTRUCT {
            ?lemma knora-api:isMainResource true .
            
            ?lemmaLocation mls:hasLLLinkToLemma ?lemma .
            
            ?lemmaLocation mls:hasLLLinkToLocation ?location .
    
        } WHERE {
    
            ?lemma a mls:Lemma .
            
            ?lemmaLocation mls:hasLLLinkToLemma ?lemma .
            
            ?lemmaLocation mls:hasLLLinkToLocation ?location .
            
            ?location a mls:Location .

        }
        OFFSET 0
      `;
        return lemmataTemplate;
    }

    /**
     * Gravsearch query to search for lexika data
     */
    searchForLexika() {

        console.log('search for lexikon');

        /* const lexikaTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://0.0.0.0:3333/ontology/0807/mls/simple/v2#>
    
        CONSTRUCT {
            ?lekixon knora-api:isMainResource true .
            
    
        } WHERE {
    
            ?lexikon a mls:Lexikon .

        }
        OFFSET 0
      `;
        return lexikaTemplate; */

    }

    /**
     * Gravsearch query to search for artikel data
     */
    searchForArtikel() {
        console.log('search for artikel');

        /*  const artikelTemplate = `
     PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
     PREFIX mls: <http://0.0.0.0:3333/ontology/0807/mls/simple/v2#>
     
         CONSTRUCT {
            
     
         } WHERE {
 
         }
         OFFSET 0
       `;
         return artikelTemplate; */

    }

}
