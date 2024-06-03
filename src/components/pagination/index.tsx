import classNames from 'classnames';

import { KeyboardEvent } from 'react';
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  PaginationItem,
  PaginationLink,
  PaginationProps,
  Pagination as PaginationRS,
} from 'reactstrap';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import { DEFAULT_COUNT_OPTIONS } from '../../constants';
import useQueryParams from '../../hooks/useQueryParams';
import { DOTS, useCreatePagination } from './useCreatePagination';
interface IPaginationCompProps {
  totalCount: number;
  siblingCount?: number;
  pageOptions?: number[];
}

type IPaginationProps = PaginationProps & IPaginationCompProps;

const Pagination = ({
  totalCount,
  siblingCount = 1,
  pageOptions = DEFAULT_COUNT_OPTIONS,
  ...rest
}: IPaginationProps) => {
  const [searchParams, setParams] = useQueryParams();
  const currentPage = +(searchParams?.page || 1);
  const count = +(searchParams?.size || DEFAULT_COUNT_OPTIONS[0]);

  const lastPageIndex = Math.ceil(totalCount / count);

  const data = useCreatePagination({
    totalCount,
    count,
    siblingCount,
    currentPage,
  });

  if (totalCount <= 0 || totalCount <= 10) return null;

  return (
    <PaginationRS
      {...rest}
      className={classNames('pagination mt-4 mb-4', rest.className)}
      style={{
        marginInline: 'auto',
        width: 'fit-content',
      }}>
      <div className='pagination align-items-center'>
        <PaginationItem
          className={'pagination__item'}
          disabled={+(searchParams.page ?? 1) <= 1}>
          <PaginationLink
            className='pagination__link pagination__link--arrow page-link'
            type='button'
            onClick={() => setParams({ page: '1' })}>
            <ChevronsLeft className='pagination__link-icon' />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          className={'pagination__item'}
          disabled={+(searchParams.page ?? 1) <= 1}>
          <PaginationLink
            className='pagination__link pagination__link--arrow page-link'
            type='button'
            onClick={() =>
              setParams({
                page: Math.max(currentPage - 1, 1).toString(),
              })
            }>
            <ChevronLeft className='pagination__link-icon' />
          </PaginationLink>
        </PaginationItem>

        {data?.map((item) =>
          item === DOTS ? (
            <PaginationItem
              key={nanoid()}
              className='pagination__item'>
              {item}
            </PaginationItem>
          ) : (
            <PaginationItem
              key={nanoid()}
              className='pagination__item'
              active={item === +(searchParams.page || 1)}>
              <PaginationLink
                className='pagination__link'
                type='button'
                onClick={() =>
                  setParams({
                    page: (item as number).toString(),
                  })
                }>
                {item as number}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem
          className={'pagination__item'}
          disabled={+(searchParams.page ?? 1) >= lastPageIndex}>
          <PaginationLink
            className='pagination__link pagination__link--arrow page-link'
            type='button'
            onClick={() => {
              setParams({
                page: Math.min(currentPage + 1, lastPageIndex).toString(),
              });
            }}>
            <ChevronRight className='pagination__link-icon' />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          className={'pagination__item'}
          disabled={+(searchParams.page ?? 1) >= lastPageIndex}>
          <PaginationLink
            className='pagination__link pagination__link--arrow page-link'
            type='button'
            onClick={() =>
              setParams({
                page: lastPageIndex.toString(),
              })
            }>
            <ChevronsRight className='pagination__link-icon' />
          </PaginationLink>
        </PaginationItem>

        <PaginationInfo totalCount={totalCount} />
        <PaginationItem className='pagination__item'>
          <FormGroup
            className='pagination__select-form'
            cssModule={{ 'mb-3': '0' }}>
            <Input
              className='pagination__item pagination-info'
              type='select'
              name='offset'
              id='count'
              value={count}
              onChange={(event) => {
                setParams({
                  page: '1',
                  size: event.target.value,
                });
              }}>
              {pageOptions.map((item) => (
                <option
                  className='pagination__item pagination__item-option'
                  key={item}
                  value={item}>
                  Show {item}
                </option>
              ))}
            </Input>
          </FormGroup>
        </PaginationItem>
        <PaginationItem className='pagination__item mx-3'>
          <InputGroup>
            <InputGroupText
              style={{
                padding: '0 10px',
                background: 'none',
                fontSize: '12px',
                color: '#999',
                border: 0,
              }}>
              Go to page:
            </InputGroupText>
            <Input
              style={{
                maxWidth: '53px',
                padding: '5.2px 4px',
                borderRadius: '0.25rem',
              }}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.code === 'Enter') {
                  e.preventDefault();
                  const value = +e.currentTarget.value;
                  setParams({
                    page: value <= 1 ? 1 : Math.min(value, lastPageIndex),
                  });
                }
              }}
            />
          </InputGroup>
        </PaginationItem>
      </div>
    </PaginationRS>
  );
};

const PaginationInfo = ({
  totalCount,
}: Omit<IPaginationCompProps, 'siblingCount' | 'pageOptions'>) => {
  const [searchParams] = useQueryParams();
  const currentPage = +(searchParams?.page || 1);
  const count = +(searchParams?.size || DEFAULT_COUNT_OPTIONS[0]);
  const start = count * ((currentPage || 1) - 1) + 1;
  const to = start + count - 1;
  const end = to > totalCount ? totalCount : to;
  return (
    <p className='pagination__item pagination-info page-item'>
      {start} to {end} / {totalCount}
    </p>
  );
};

export default Pagination;
