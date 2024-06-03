import React, { CSSProperties, ReactNode } from 'react';
import { Table as TableRS } from 'reactstrap';

import { IActions } from './ActionsMenu';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export interface IHeaderCell {
  key: string;
  label: ReactNode;
  align?: 'center' | 'left' | 'right';
  hide?: boolean;
}

export type cellData = string | number | React.ReactNode;

export interface ICell {
  [key: string]:
    | cellData
    | (() => cellData)
    | {
        value: cellData | (() => cellData);
        onCellClick?: () => void;
      };
}

export interface IRow {
  cells: ICell;
  onRowClick?: () => void;
  onRowRightClick?: () => void;
  rowStyle?: React.CSSProperties;
  actions?: IActions[];
  onCollapse?: () => ReactNode;
}

export interface IProps {
  id?: string;
  columns: IHeaderCell[];
  rows?: IRow[];
  style?: CSSProperties;
  tableClass?: Element['className'];
}

const Table = (props: IProps) => {
  const { columns, id, style, tableClass = '' } = props;

  return (
    <>
      <TableRS
        className={`border ${tableClass}`}
        id={id}
        hover
        style={style || {}}>
        <TableHeader columns={columns} />
        <TableBody
          {...props}
          columns={columns}
        />
      </TableRS>
    </>
  );
};

export default Table;
