import { IHeaderCell, IRow } from '.';
import ActionsMenu from './ActionsMenu';

const TableRow = ({ columns, row }: { columns: IHeaderCell[]; row: IRow }) => {
  return (
    <>
      <tr
        onClick={() => row?.onRowClick?.()}
        style={{
          ...row?.rowStyle,
          borderTop: '2px solid #f2f4f7',
        }}
        onContextMenu={() => {
          row?.onRowRightClick?.();
        }}>
        {columns.map(({ key, align, hide }, j) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cell = row?.cells?.[key] as any;
          const value = cell?.value ?? cell;

          return (
            !hide && (
              <td
                key={j}
                style={{ textAlign: align || 'left', verticalAlign: 'middle' }}
                onClick={(e) => {
                  if (cell?.onCellClick !== undefined) {
                    e.stopPropagation();
                    cell?.onCellClick();
                  }
                }}>
                {typeof value === 'function' ? value() : value ?? '-'}
              </td>
            )
          );
        })}
        {row?.actions && (
          <td
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ verticalAlign: 'middle' }}>
            <ActionsMenu actions={row.actions} />
          </td>
        )}
      </tr>
    </>
  );
};

export default TableRow;
