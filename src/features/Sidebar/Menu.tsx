import { Accordion, AccordionHeader, AccordionBody, Typography } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { NavItem } from './type';
import Link from 'next/link';
import { useAccountStore } from '../Account/providers';
import { useRouter } from 'next/router';

function Icon({ isOpen }: { isOpen: boolean }) {
  if (isOpen) return <ChevronUpIcon />;
  return <ChevronDownIcon />;
}

type NavMenu = {
  items: NavItem[];
};
const NavMenu: React.FC<NavMenu> = ({ items }) => {
  const scopes = useAccountStore((state) => state.account.scopes);
  const router = useRouter();
  const [navActive, setNavActive] = useState<string | null>(null);

  const handleOpen = (value: string) => {
    setNavActive(navActive === value ? null : value);
  };

  return (
    <Fragment>
      {items
        .filter((item) => item.scopes.some((scope) => scopes.includes(scope)))
        .map((nav) => {
          const isActive = nav.id === navActive || (nav.link ? router.pathname.includes(nav.link) : false);
          const isChild = nav.children && nav.children.length;
          return (
            <Accordion key={nav.id} open={isActive} icon={isChild ? <Icon isOpen={isActive} /> : <></>}>
              <AccordionHeader className="p-1 border-none" onClick={() => handleOpen(nav.id)}>
                <Typography variant="h6">
                  {nav.link && !nav.disableLink ? <Link href={nav.link}>{nav.title}</Link> : nav.title}
                </Typography>
              </AccordionHeader>
              {isChild && (
                <AccordionBody className="pl-4 py-0">
                  <NavMenu items={nav.children!} />
                </AccordionBody>
              )}
            </Accordion>
          );
        })}
    </Fragment>
  );
};

export default NavMenu;
