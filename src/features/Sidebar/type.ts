export interface NavItem {
  id: string;
  title: string;
  link?: string;
  children?: NavItem[];
  disableLink?: boolean;
  scopes: string[];
}
