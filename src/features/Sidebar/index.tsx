'use client';

import { Fragment } from 'react';
import { NAV_MENU } from './constant';
import NavMenu from './Menu';
import { Typography } from '@material-tailwind/react';
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import instance from '@src/utils/instance';
import HEADERS from '@server/utils/headers';
import { toast } from 'react-hot-toast';
import { TErrorResponse } from '@server/schema/response.schema';

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const refreshToken = window.localStorage.getItem('refreshToken');
      const clientId = window.localStorage.getItem('clientId');
      const deviceId = window.localStorage.getItem('deviceId');
      await instance.post(
        '/accounts/logout',
        {},
        {
          headers: {
            [HEADERS.REFRESH_TOKEN]: refreshToken,
            [HEADERS.CLIENT_ID]: clientId,
            [HEADERS.DEVICE_ID]: deviceId,
          },
        },
      );
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('clientId');
      window.localStorage.removeItem('deviceId');
      window.location.href = '/signin';
    } catch (error) {
      console.log(error);
      toast.error((error as TErrorResponse).message!, {
        position: 'bottom-center',
      });
    }
  };

  return (
    <Fragment>
      <NavMenu items={NAV_MENU} />
      <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
          <div className="w-6">
            <ArrowLeftOnRectangleIcon />
          </div>
          <Typography variant="h6">Logout</Typography>
        </div>
        <div className="flex items-center">
          <div className="w-6">
            <Link href="/admin/settings">
              <Cog6ToothIcon />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
