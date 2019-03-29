import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    private _mls: MlsService,
    public location: Location
  ) { }

  ngOnInit() {
    // generate gravsearch query
    this.gravsearch = this._mls.searchForLexika();
  }

}
