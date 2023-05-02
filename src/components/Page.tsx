import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import Link from 'next/link';

export type Page = {
  children: React.ReactNode;
  title: string;
  backUrl?: string;
  headerActions?: React.ReactNode;
  footerActions?: React.ReactNode;
};

const Page: React.FC<Page> = ({ children, footerActions, headerActions, title, backUrl }) => {
  return (
    <div className="page__wrapper">
      <div className="page__header flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backUrl && (
            <Link href={backUrl}>
              <ArrowLeftIcon strokeWidth={2} className="text-black h-7 w-7 hover:cursor-pointer" />
            </Link>
          )}
          <Typography variant="h3" className="text-black">
            {title}
          </Typography>
        </div>
        <div>{headerActions}</div>
      </div>
      <div className="page__body mt-4">{children}</div>
      <div className="page__footer">{footerActions}</div>
    </div>
  );
};

export default Page;
