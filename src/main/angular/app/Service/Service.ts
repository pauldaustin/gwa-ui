
export interface Service<T> {

  addObject(object: T): Promise<Plugin>;

  deleteObject(object: T): Promise<boolean>;

  toObject(json: any): T;

  updateObject(object: T): Promise<T>;

}
