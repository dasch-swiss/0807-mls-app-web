import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MlsService } from '../../services/mls.service';

@Component({
  selector: 'mls-lemmata',
  templateUrl: './lemmata.component.html',
  styleUrls: ['./lemmata.component.scss']
})
export class LemmataComponent implements OnInit {

  gravsearch: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mls: MlsService
  ) { }

  ngOnInit() {
    // generate gravsearch query
    this.gravsearch = this._mls.searchForLemmata();
  }

}
