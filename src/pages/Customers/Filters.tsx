import FormField from '@/components/form/FormField';
import TableFilter from '@/components/table/TableFilter';
import useQueryParams from '@/hooks/useQueryParams';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { CustomerFilterForm, customerFilterSchema } from './validations';

function getDefaultValues(searchParams: Record<string, string>) {
  return {
    CustomerID: searchParams?.CustomerID ?? '',
    Name: searchParams?.Name ?? '',
    Surname: searchParams?.Surname ?? '',
    GSMNumber: searchParams?.GSMNumber ?? '',
    BirthDate: searchParams?.BirthDate ?? '',
  };
}

const CustomerFilters = () => {
  const [searchParams, setParams] = useQueryParams();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    trigger,
    reset,
  } = useForm<CustomerFilterForm>({
    mode: 'onChange',
    defaultValues: getDefaultValues(searchParams),
    resolver: yupResolver(
      customerFilterSchema
    ) as unknown as Resolver<CustomerFilterForm>,
  });

  const onSubmit = (values: CustomerFilterForm) => {
    setParams({ ...values, page: '1' });
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
        name='CustomerID'
        label='Customer ID'
      />
      <FormField
        control={control}
        name='Name'
        label='Name'
      />
      <FormField
        control={control}
        name='Surname'
        label='Surname'
      />
      <FormField
        control={control}
        name='GSMNumber'
        label='GSMNumber'
        onChange={(value) => {
          if (value && !value?.startsWith('+')) {
            setValue('GSMNumber', `+${value}`);
            trigger('GSMNumber');
          }
        }}
      />
      <FormField
        control={control}
        name='BirthDate'
        label='BirthDate'
        inputProps={{
          type: 'date',
        }}
      />
    </TableFilter>
  );
};

export default CustomerFilters;
