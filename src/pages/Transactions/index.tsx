import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableFilterBadges from '@/components/table/TableFilterBadges';
import {
  DEFAULT_COUNT_OPTIONS,
  ROUTES,
  dateFormat,
  transactionKeys,
} from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useTransactions } from '@/stores/transactions';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import TransactionFilters from './Filters';

const keys = [
  transactionKeys.CustomerID,
  transactionKeys.TransactionAmount,
  transactionKeys.TransactionDate,
  transactionKeys.TransactionID,
];

const Transactions = () => {
  const transactions = useTransactions((state) => state.transactions);
  const [params] = useQueryParams();
  const { page, size } = params;

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (Object.keys(params).length) {
      Object.keys(params).forEach((key) => {
        if (['page', 'size'].includes(key)) return;
        if (key === transactionKeys.TransactionDate.key) {
          result = result?.filter(
            (transaction) =>
              dayjs(transaction?.TransactionDate).format(dateFormat) ===
              dayjs(params?.['TransactionDate']).format(dateFormat)
          );
        } else {
          result = result?.filter(
            (transaction) =>
              transaction?.[key as keyof typeof transaction] === params?.[key]
          );
        }
      });
    }
    return result;
  }, [params, transactions]);

  const start = +(size || DEFAULT_COUNT_OPTIONS[0]) * ((+page || 1) - 1);
  const to = start + +(size || DEFAULT_COUNT_OPTIONS[0]);

  return (
    <div>
      <div className='d-flex align-items-center gap-2 justify-content-end mb-3'>
        <TransactionFilters />
      </div>
      <TableFilterBadges filters={keys} />
      <Table
        columns={keys}
        rows={filteredTransactions?.slice(start, to)?.map((transaction) => {
          return {
            cells: {
              [transactionKeys.TransactionID.key]: transaction?.TransactionID,
              [transactionKeys.TransactionAmount.key]:
                transaction?.TransactionAmount,
              [transactionKeys.TransactionDate.key]:
                transaction?.TransactionDate,
              [transactionKeys.CustomerID.key]: (
                <Link
                  className='text-decoration-none'
                  to={`${ROUTES?.CUSTOMERS?.path}?CustomerID=${transaction?.CustomerID}`}>
                  {transaction?.CustomerID}
                </Link>
              ),
            },
          };
        })}
      />
      <Pagination totalCount={filteredTransactions?.length} />
    </div>
  );
};

export default Transactions;
