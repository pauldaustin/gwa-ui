import { Injectable } from '@angular/core';
import { 
  Router, 
  Resolve, 
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Consumer } from './Consumer';
import { ConsumerService } from './ConsumerService';

@Injectable()
export class ConsumerResolver implements Resolve<Consumer> {
  constructor(
    private service: ConsumerService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Consumer> {
    let consumerName = route.params[this.service.pathParamName];
    return this.service.getObject(consumerName).then(consumer => {
      if (consumer) {
        return consumer;
      } else {
        this.router.navigate(['/ui/consumers']);
        return null;
      }
    });
  }
}