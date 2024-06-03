import FormField from '@/components/form/FormField';
import TableFilter from '@/components/table/TableFilter';
import { dateFormat, transactionKeys } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ITransactionFilters {
  TransactionID: string;
  CustomerID: string;
  TransactionDate: string;
  TransactionAmount: string;
}

function getDefaultValues(searchParams: Record<string, string>) {
  return {
    TransactionID: searchParams?.TransactionID ?? '',
    CustomerID: searchParams?.CustomerID ?? '',
    TransactionDate: searchParams?.TransactionDate ?? '',
    TransactionAmount: searchParams?.TransactionAmount ?? '',
  };
}

const TransactionFilters = () => {
  const [searchParams, setParams] = useQueryParams();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<ITransactionFilters>({
    mode: 'onChange',
    defaultValues: getDefaultValues(searchParams),
  });

  const onSubmit = (values: ITransactionFilters) => {
    setParams({
      ...values,
      page: '1',
      TransactionDate: dayjs(values?.TransactionDate)
        .format(dateFormat)
        .toString(),
    });
  };

  useEffect(() => {
    reset(getDefaultValues(searchParams));
  }, [searchParams, reset]);

  return (
    <TableFilter
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}>
      <FormField
        control={control}
        label='Transaction ID'
        name='TransactionID'
        inputProps={{
          placeholder: transactionKeys.TransactionID.label,
        }}
      />
      <FormField
        control={control}
        label='Customer ID'
        name='CustomerID'
        inputProps={{
          placeholder: transactionKeys.CustomerID.label,
        }}
      />
      <FormField
        control={control}
        label='Transaction Amount'
        name='TransactionAmount'
        inputProps={{
          placeholder: transactionKeys.TransactionAmount.label,
        }}
      />
      <FormField
        control={control}
        label='Transaction Date'
        name='TransactionDate'
        inputProps={{
          type: 'date',
        }}
      />
    </TableFilter>
  );
};

export default TransactionFilters;
