import Pagination from '@/components/pagination';
import Table from '@/components/table';
import TableFilterBadges from '@/components/table/TableFilterBadges';
import {
  DEFAULT_COUNT_OPTIONS,
  ROUTES,
  customerKeys,
  dateFormat,
} from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useCustomers } from '@/stores/customers';
import dayjs from 'dayjs';
import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import CustomerFilters from './Filters';
import MaskedCard from './components/MaskedCard';
import { AddCardNumber, IAddCardNumber } from './operations/AddCardNumber';
import CreateCustomer, {
  ICreateCustomerModal,
} from './operations/CreateCustomer';
import {
  IRemoveCardNumber,
  RemoveCardNumber,
} from './operations/RemoveCardNumber';

const keys = [
  customerKeys.CustomerID,
  customerKeys.Name,
  customerKeys.Surname,
  customerKeys.CardNumber,
  customerKeys.GSMNumber,
  customerKeys.BirthDate,
];

const Customers = () => {
  const navigate = useNavigate();
  const createCustomerRef = useRef<ICreateCustomerModal>(null);
  const removeCardNumberRef = useRef<IRemoveCardNumber>(null);
  const addCardNumberRef = useRef<IAddCardNumber>(null);
  const customers = useCustomers((state) => state.customers);
  const [params] = useQueryParams();
  const { page, size } = params;

  const filteredCustomers = useMemo(() => {
    let result = customers;
    if (Object.keys(params).length) {
      Object.keys(params).forEach((key) => {
        if (['page', 'size'].includes(key)) return;
        if (key === customerKeys.BirthDate.key) {
          result = result?.filter(
            (customer) =>
              dayjs(customer?.BirthDate).format(dateFormat) ===
              dayjs(params?.['BirthDate']).format(dateFormat)
          );
        } else {
          result = result?.filter(
            (customer) =>
              customer?.[key as keyof typeof customer] === params?.[key]
          );
        }
      });
    }
    return result;
  }, [params, customers]);

  const start = +(size || DEFAULT_COUNT_OPTIONS[0]) * ((+page || 1) - 1);
  const to = start + +(size || DEFAULT_COUNT_OPTIONS[0]);

  return (
    <div>
      <div className='d-flex align-items-center gap-2 justify-content-end mb-3'>
        <Button onClick={() => createCustomerRef?.current?.open()}>
          Create Customer
        </Button>
        <CustomerFilters />
      </div>
      <TableFilterBadges filters={keys} />
      <Table
        columns={keys}
        rows={filteredCustomers?.slice(start, to)?.map((customer) => {
          return {
            cells: {
              [customerKeys.CustomerID.key]: customer?.CustomerID,
              [customerKeys.Name.key]: customer?.Name,
              [customerKeys.Surname.key]: customer?.Surname,
              [customerKeys.GSMNumber.key]: customer?.GSMNumber,
              [customerKeys.CardNumber.key]: (
                <MaskedCard cardNumber={customer?.CardNumber} />
              ),
              [customerKeys.BirthDate.key]: dayjs(customer?.BirthDate).format(
                dateFormat
              ),
            },
            actions: [
              {
                label: 'View Transactions',
                onClick: () => {
                  navigate(
                    `${ROUTES.TRANSACTIONS.path}?CustomerID=${customer?.CustomerID}`
                  );
                },
              },
              {
                label: 'Remove Card Number',
                onClick: () => {
                  removeCardNumberRef?.current?.open(customer?.CustomerID);
                },
                hide: !customer?.CardNumber,
              },
              {
                label: 'Add Card Number',
                onClick: () => {
                  addCardNumberRef?.current?.open(customer?.CustomerID);
                },
                hide: Boolean(customer?.CardNumber),
              },
            ],
          };
        })}
      />
      <Pagination totalCount={filteredCustomers?.length} />
      <CreateCustomer ref={createCustomerRef} />
      <RemoveCardNumber ref={removeCardNumberRef} />
      <AddCardNumber ref={addCardNumberRef} />
    </div>
  );
};

export default Customers;
