import { IHeaderCell } from '.';

const TableHeader = ({ columns }: { columns: IHeaderCell[] }) => {
  return (
    <thead>
      <tr>
        {columns.map(
          ({ key, label, align, hide = false, ...rest }) =>
            !hide && (
              <th
                key={key}
                style={{ textAlign: align || 'left' }}
                {...rest}>
                {label}
              </th>
            )
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
