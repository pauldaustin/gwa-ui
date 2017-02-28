import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { Application } from './Application';

@Injectable()
export class ApplicationService extends BaseService<Application> {
 
  constructor(injector:Injector) {
    super(injector);
  }

  
  addObject(application: Application): Promise<Application> {
    return this.addObjectDo(
      '/apps',
      application
    );
  }
 
  deleteObject(application: Application): Promise<boolean> {
    return this.deleteObjectDo(
      `/apps/${application.id}`
    );
  }

  getRowsPage(offset: number, limit: number): Promise<any> {
    return this.getRowsPageDo('/applications', offset, limit);
  }

  newObject(): Application {
    return new Application();
  }

  updateObject(application: Application): Promise<Application> {
    return null;
  }
}
