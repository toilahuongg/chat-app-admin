import { Typography } from '@material-tailwind/react';
import { MouseEventHandler, useMemo } from 'react';

type Heading = {
  id: string;
  title: React.ReactNode;
};
export type DataTable = {
  headings: Heading[];
  children: React.ReactNode;
  sticky?: boolean;
  selectable?: boolean;
};

const DataTable: React.FC<DataTable> = ({ headings, children, sticky }) => {
  const thClassnames = useMemo(() => {
    let classNames = 'py-3 px-5 text-left bg-white';
    if (sticky) classNames += ' sticky top-0';
    return classNames;
  }, [sticky]);
  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr className="border-b border-blue-gray-50">
          {headings.map(({ id, title }) => (
            <th key={id} className={thClassnames}>
              <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                {title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export type DataTableRow = {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
};
const Row: React.FC<DataTableRow> = ({ className, children, onClick }) => {
  return (
    <tr className={'border-b border-blue-gray-50 bg-white hover:bg-cyan-50 ' + (className || '')} onClick={onClick}>
      {children}
    </tr>
  );
};

export type DataTableCell = {
  className?: string;
  children: React.ReactNode;
};
const Cell: React.FC<DataTableCell> = ({ className, children }) => {
  return <td className={'py-3 px-5 ' + (className || '')}>{children}</td>;
};

export default Object.assign(DataTable, { Row, Cell });
