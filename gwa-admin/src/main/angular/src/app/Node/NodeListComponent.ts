import { 
  Component, 
  Injector
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Node } from './Node';
import { NodeService } from './NodeService';

@Component({
  selector: 'node-list',
  templateUrl: 'List.html'
})
export class NodeListComponent extends BaseListComponent<Node> {

  constructor(
    injector: Injector,
    protected nodeService: NodeService
  ) {
    super(injector, nodeService);
    this.paging = true;
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', sortable: false },
      { name: 'Address', maxWidth: '150', sortable: false },
      { name: 'Status', maxWidth: '70', sortable: false },
      { name: 'Actions', cellTemplate: this.actionsTemplate, maxWidth: '60', sortable: false }
    ];
    super.ngOnInit();
  }
}