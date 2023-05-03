import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Button, IconButton } from '@material-tailwind/react';
import { Pagination } from '@src/types';
import { useMemo } from 'react';

export type TProps = Pagination & {
  onChangePage: (page: number) => void;
};

const PAGE_NUMBER = 5;
const Pagination: React.FC<TProps> = ({ currentPage, nextPage, prevPage, totalPage, onChangePage }) => {
  const pages = useMemo(() => {
    const result = [];
    for (let i = currentPage - PAGE_NUMBER + 1; i < currentPage + PAGE_NUMBER; i++) result.push(i);
    return result.filter((i) => i >= 1 && i <= totalPage).slice(0, 5);
  }, [totalPage, currentPage]);
  return (
    <div className="flex gap-2 mt-4">
      <IconButton variant="outlined" disabled={!prevPage} onClick={() => onChangePage(prevPage)}>
        <ArrowLeftIcon className="w-4 h-4" />
      </IconButton>
      {pages.map((page) => (
        <Button variant={currentPage === page ? 'filled' : 'outlined'} key={page} onClick={() => onChangePage(page)}>
          {page}
        </Button>
      ))}
      <IconButton variant="outlined" disabled={!nextPage} onClick={() => onChangePage(nextPage)}>
        <ArrowRightIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
};

export default Pagination;
