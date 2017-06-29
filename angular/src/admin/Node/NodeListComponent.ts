import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import { BaseListComponent } from '../../Component/BaseListComponent';

import { Node } from './Node';
import { NodeService } from './NodeService';

@Component({
  selector: 'app-node-list',
  templateUrl: 'NodeList.html'
})
export class NodeListComponent extends BaseListComponent<Node> implements OnInit {

  constructor(
    injector: Injector,
    protected nodeService: NodeService
  ) {
    super(injector, nodeService);
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', sortable: true },
      { name: 'Address', maxWidth: '150', sortable: true },
      { name: 'Status', maxWidth: '70', sortable: true },
      { name: 'Actions', cellTemplate: this.actionsTemplate, maxWidth: '60', sortable: false }
    ];
    super.ngOnInit();
  }
}
