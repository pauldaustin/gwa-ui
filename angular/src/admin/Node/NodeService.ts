import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../../shared/Service/BaseService';

import { Node } from './Node';

@Injectable()
export class NodeService extends BaseService<Node> {
  constructor(injector: Injector) {
    super(injector);
    this.path = `/nodes`;
  }

  deleteObject(node: Node, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      '/nodes',
      null, {
        name: node.name
      }
    );
  }

  newObject(): Node {
    return new Node();
  }
}
