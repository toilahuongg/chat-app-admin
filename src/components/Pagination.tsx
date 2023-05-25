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
    return result.filter((i) => i >= 1 && i <= totalPage).slice(0, PAGE_NUMBER);
  }, [totalPage, currentPage]);
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        disabled={!prevPage}
        onClick={() => onChangePage(prevPage)}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <IconButton
            color={currentPage === page ? 'blue' : 'blue-gray'}
            variant={currentPage === page ? 'filled' : 'outlined'}
            key={page}
            onClick={() => onChangePage(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        disabled={!nextPage}
        onClick={() => onChangePage(nextPage)}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
