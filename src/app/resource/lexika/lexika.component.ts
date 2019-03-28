import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MlsService } from '../../services/mls.service';

@Component({
  selector: 'mls-lexika',
  templateUrl: './lexika.component.html',
  styleUrls: ['./lexika.component.scss']
})
export class LexikaComponent implements OnInit {

  gravsearch: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mls: MlsService
  ) { }

  ngOnInit() {
    // generate gravsearch query
    this.gravsearch = this._mls.searchForLexika();
  }

}
