import { CircleX } from 'lucide-react';
import { CSSProperties, ReactNode } from 'react';
import { Badge } from 'reactstrap';
import useQueryParams from '../../hooks/useQueryParams';

const badgeStyle = {
  fontSize: '14px',
  marginRight: '6px',
  marginTop: '6px',
};

interface IBadgeComponent {
  label: ReactNode;
  value?: string | null;
  onDelete?: () => void;
  showCloseIcon?: boolean;
  style?: CSSProperties;
}

export const BadgeComponent = ({
  label,
  value,
  onDelete,
  showCloseIcon = true,
  style,
  ...rest
}: IBadgeComponent) => {
  return (
    <Badge
      color='secondary d-inline-flex'
      pill
      style={{ ...badgeStyle, ...style }}
      {...rest}>
      {label}
      {value ? `:${value}` : ''}
      {showCloseIcon && (
        <CircleX
          size='14'
          style={{ marginLeft: '6px', cursor: 'pointer' }}
          onClick={onDelete}
        />
      )}
    </Badge>
  );
};
type ISingleFilterBadge = {
  label: string;
  value?: string | null;
  key: string;
};
type IFilterBadges = Array<ISingleFilterBadge>;

const TableFilterBadges = ({
  filters,
  onClearClick,
  onDeleteBadge,
}: {
  filters: IFilterBadges | (() => IFilterBadges);
  onClearClick?: () => void;
  onDeleteBadge?: () => void;
}) => {
  const [searchParams, setParams] = useQueryParams();
  const result = typeof filters === 'function' ? filters() : filters;

  const content = result
    ?.map(({ label, key, value }) => {
      const val = (value ?? searchParams[key]) as string;

      if (val?.includes(',')) {
        return val.split(',').map((item) => {
          return {
            label,
            value: item,
            key,
          };
        });
      } else {
        return {
          label,
          value: val,
          key,
        };
      }
    })
    ?.flat(1)
    ?.filter(({ value, key }) => value != null && searchParams?.[key])
    ?.map(({ value, key, label }) => {
      return { label, value, key };
    })
    ?.filter((item) => item?.key);

  return (
    <>
      {!!content?.length && (
        <div className='my-3 table-brades'>
          {content.map(({ label, value, key }) => (
            <BadgeComponent
              key={`${key}-${value}`}
              label={label}
              value={value?.replaceAll('_', ' ')}
              onDelete={() => {
                const values = new URLSearchParams(searchParams).get(key);
                const filtered = values
                  ?.split(',')
                  .filter((item) => item !== value)
                  .join(',') as string;
                new URLSearchParams(searchParams).set(key, filtered);
                setParams({
                  ...searchParams,
                  [key]: filtered ? filtered : null,
                });
                onDeleteBadge?.();
              }}
            />
          ))}
          {content.length > 1 && (
            <Badge
              color='secondary'
              style={{ ...badgeStyle, cursor: 'pointer' }}
              pill
              onClick={() => {
                const acc = new Map();
                const filterKeys = content.reduce(
                  (acc: Map<string, string | null>, { key }) => {
                    acc.set(key, null);
                    return acc;
                  },
                  acc
                );
                setParams(Object.fromEntries(filterKeys));
                onClearClick?.();
              }}>
              Clear All
            </Badge>
          )}
        </div>
      )}
    </>
  );
};

export default TableFilterBadges;
