import FormField from '@/components/form/FormField';
import ModalComp from '@/components/modal';
import { ICustomer } from '@/constants/models';
import useOpenState from '@/hooks/useOpenState';
import { setCustomers, useCustomers } from '@/stores/customers';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'reactstrap';
import { AddCardNumberSchemaForm, addCardNumberSchema } from '../validations';

export type IAddCardNumber = {
  open: (customerId: string) => void;
};

export const AddCardNumber = forwardRef((_, ref) => {
  const { isOpen, toggle, close, open } = useOpenState();
  const [customerId, setCustomerId] = useState('');
  const customers = useCustomers((state) => state.customers);
  const openModal = useCallback(
    (customerId: string) => {
      setCustomerId(customerId);
      open();
    },
    [open]
  );

  const { control, reset, handleSubmit } = useForm<AddCardNumberSchemaForm>({
    defaultValues: {
      CardNumber: '',
    },
    resolver: yupResolver(addCardNumberSchema),
  });

  useImperativeHandle(ref, () => ({
    open: openModal,
  }));

  const addCardNumberToCustomer = ({
    CardNumber,
  }: AddCardNumberSchemaForm & { customerId: string }) => {
    setCustomers(
      customers.map((customer) => {
        if (customer.CustomerID === customerId) {
          customer = Object.assign({}, customer, {
            CardNumber,
          } as ICustomer);
        }
        return customer;
      })
    );
  };

  const onSubmit = (values: AddCardNumberSchemaForm) => {
    addCardNumberToCustomer({ customerId, CardNumber: values?.CardNumber });
    handleClose();
  };

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <ModalComp
      isOpen={isOpen}
      toggle={toggle}
      modalProps={{
        size: 'lg',
        style: {
          maxWidth: '700px',
        },
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalComp.Header close={close}>
          <h3>Add card number to Customer</h3>
        </ModalComp.Header>
        <ModalComp.Body>
          <FormField
            name='CardNumber'
            label='CardNumber'
            control={control}
          />
        </ModalComp.Body>
        <ModalComp.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button
            type='submit'
            color='primary'>
            Save
          </Button>
        </ModalComp.Footer>
      </form>
    </ModalComp>
  );
});
