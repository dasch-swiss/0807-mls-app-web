import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MlsService } from '../../services/mls.service';

@Component({
  selector: 'mls-artikel',
  templateUrl: './artikel.component.html',
  styleUrls: ['./artikel.component.scss']
})
export class ArtikelComponent implements OnInit {

  gravsearch: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mls: MlsService,
    public location: Location
  ) { }

  ngOnInit() {
    // generate gravsearch query
    this.gravsearch = this._mls.searchForArtikel();
  }
}
