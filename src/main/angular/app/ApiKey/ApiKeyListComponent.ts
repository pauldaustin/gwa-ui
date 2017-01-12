import { Component, Input } from '@angular/core';

import { ApiKey } from './ApiKey';
import { EndPoint } from '../EndPoint/EndPoint';
import { EndPointService }  from '../EndPoint/EndPointService';

@Component({
  moduleId: module.id,
  selector: 'apiKey-list',
  templateUrl: 'ApiKeyListComponent.html'
})
export class ApiKeyListComponent{
  @Input() endPoint: EndPoint;

  constructor(
    private endPointService: EndPointService,
  ) {
  }

  create(userTitle: string): void {
    userTitle = userTitle.trim();
    if (userTitle) {
      this.endPointService.createApiKey(this.endPoint.id, userTitle)
      .then(apiKey => {
        this.endPoint.apiKeyAdd(apiKey);
      });
    }
  }

  delete(apiKey: ApiKey): void {
    this.endPointService
      .deleteApiKey(this.endPoint.id, apiKey.id)
      .then((data) => {
        if (data.deleted) {
          this.endPoint.apiKeyRemove(apiKey);
        } 
      });
  }
}
