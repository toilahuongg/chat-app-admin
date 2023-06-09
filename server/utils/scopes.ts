export const SCOPES = {
  ACCESS_ADMINISTRATION: 'access_administration',
  READ_ACCOUNTS: 'read_accounts',
  WRITE_ACCOUNTS: 'write_accounts',
  MANAGER_ROLE_ACCOUNTS: 'manager_role_accounts',
  MANAGER_KEY_ACCOUNTS: 'manager_key_accounts',
  READ_ROLES: 'read_roles',
  WRITE_ROLES: 'write_roles',
  WRITE_PRODUCTS: 'write_products',
  READ_PRODUCTS: 'read_products',
  WRITE_ORDERS: 'write_orders',
  READ_ORDERS: 'read_orders',
  WRITE_PRODUCT_CATEGORIES: 'write_product_categories',
  READ_PRODUCT_CATEGORIES: 'read_product_categories',
};

export type TScopes = typeof SCOPES;
