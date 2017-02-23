import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { Node } from './Node';

@Injectable()
export class NodeService extends BaseService<Node> {
  constructor(injector:Injector) {
    super(injector);
  }

  deleteObject(node: Node): Promise<boolean> {
    return this.deleteObjectDo(
      '/nodes',
      null, {
        name: node.name
      }
    );
  }

  getRowsPage(offset: number, limit: number): Promise<any> {
    return this.getRowsPageDo('/nodes', offset, limit);
  }

  newObject(): Node {
    return new Node();
  }
}
