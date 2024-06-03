import { IProps } from '.';
import TableRow from './TableRow';

const TableBody = ({ columns, rows }: IProps) => {
  return (
    <tbody>
      {rows?.map((item, i) => (
        <TableRow
          key={i}
          row={item}
          columns={columns}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
