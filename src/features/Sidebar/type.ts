export interface NavItem {
  id: string;
  title: string;
  link?: string;
  children?: NavItem[];
  scopes: string[];
}
