import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="panel panel-danger">
      <div class="panel-heading">
        <h3 class="panel-title">404 Error</h3>
      </div>
      <div class="panel-body">
        <h4>I'm sorry the page you requested could not be found.</h4>
        <button type="button" (click)="back()" class="btn btn-primary btn-sm">
          <span class="fa fa-chevron-left" aria-hidden="true"></span> Back
        </button>
      </div>
    </div>
  `
})
export class PageNotFoundComponent {
  constructor(private location: Location) {
  }

  back() {
    this.location.back();
  }
}
