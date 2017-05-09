
export interface Service<T> {

  addObject(object: T, path?: string): Promise<T>;

  addOrUpdateObject(object: T): Promise<T>;

  deleteObject(object: T, path?: string): Promise<boolean>;

  newObject(): T;
  
  toObject(json: any): T;

  updateObject(object: T): Promise<T>;

  getLabel(object: T): string;

  getObjects(): Promise<T[]>;
  
  getObject(id: string): Promise<T>;

  getPath() : string;

  getRowsPage(
    offset : number, 
    limit : number, 
    path?: string,
    filter? : { [fieldName: string] : string}
  ): Promise<any>;

  getTypeTitle() : string;
}
