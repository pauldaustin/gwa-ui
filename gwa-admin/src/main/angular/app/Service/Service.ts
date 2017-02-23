
export interface Service<T> {

  addObject(object: T): Promise<Plugin>;

  deleteObject(object: T): Promise<boolean>;

  newObject(): T;
  
  toObject(json: any): T;

  updateObject(object: T): Promise<T>;

  getObjects(): Promise<T[]>;
  
  getObject(id: string): Promise<T>;
  
  getRowsPage(offset: number, limit: number): Promise<any>;
}
