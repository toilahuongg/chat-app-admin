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
};

export type TScopes = typeof SCOPES;
