
export interface Service<T> {

  addObject(object: T): Promise<T>;

  deleteObject(object: T): Promise<boolean>;

  newObject(): T;
  
  toObject(json: any): T;

  updateObject(object: T): Promise<T>;

  getObjects(): Promise<T[]>;
  
  getObject(id: string): Promise<T>;

  getPath() : string;

  getRowsPage(offset: number, limit: number): Promise<any>;
}
