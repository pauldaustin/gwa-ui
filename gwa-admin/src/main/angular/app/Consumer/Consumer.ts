export class Consumer {
  id : string;
  custom_id : string;
  username : string;
  created_at : number;
  
  getLabel(): string {
    if (this.username) {
      return this.username;
    } else {
      return this.custom_id;
    }
  }
}
