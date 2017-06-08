import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template: `
    <div class="panel panel-danger">
      <div class="panel-heading">
        <h3 class="panel-title">404 Error</h3>
      </div>
      <div class="panel-body">
        <h4>I'm sorry the page you requested could not be found.</h4>
        <button type="button" onclick="history.go(-1)" class="btn btn-primary btn-sm">
          <span class="fa fa-chevron-left" aria-hidden="true"></span> Back
        </button>
      </div>
    </div>
  `
})
export class PageNotFoundComponent {
}
