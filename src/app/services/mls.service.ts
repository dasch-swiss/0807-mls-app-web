import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MlsService {

  constructor() { }

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
      `;
    return lemmataTemplate;
  }
}
