import './globals.scss';

export const metadata = {
  title: 'Admin site',
  description: 'Deploy be DevHugon',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
