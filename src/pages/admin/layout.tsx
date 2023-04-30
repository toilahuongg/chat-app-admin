export const metadata = {
  title: 'Admin',
  description: 'Deploy be DevHugon',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div id="admin">{children}</div>;
}
