'use client';

import Sidebar from '@src/features/Sidebar';

type Props = {
  children: React.ReactNode;
};
export default function RootTemplate({ children }: Props) {
  return (
    <div className="sectionWrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">{children}</div>
    </div>
  );
}
