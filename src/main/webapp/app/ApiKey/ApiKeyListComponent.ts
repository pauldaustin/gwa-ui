import { Component, Input } from '@angular/core';

import { ApiKey } from './ApiKey';
import { EndPoint } from '../EndPoint/EndPoint';

@Component({
  moduleId: module.id,
  selector: 'apiKey-list',
  templateUrl: 'ApiKeyListComponent.html'
})
export class ApiKeyListComponent{
  @Input() apiKeys: Array<ApiKey>;
}
