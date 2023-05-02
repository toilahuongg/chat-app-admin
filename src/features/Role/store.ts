export interface Role {
  _id: string;
  name: string;
  desc?: string;
  scopes: string[];
}
