import ModalComp from '@/components/modal';
import { ICustomer } from '@/constants/models';
import useOpenState from '@/hooks/useOpenState';
import { setCustomers, useCustomers } from '@/stores/customers';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Button } from 'reactstrap';

export type IRemoveCardNumber = {
  open: (customerId: string) => void;
};

export const RemoveCardNumber = forwardRef((_, ref) => {
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

  useImperativeHandle(ref, () => ({
    open: openModal,
  }));

  const removeCardNumberFromCustomer = (customerId: string) => {
    setCustomers(
      customers.map((customer) => {
        if (customer.CustomerID === customerId) {
          customer = Object.assign({}, customer, {
            CardNumber: '',
          } as ICustomer);
        }
        return customer;
      })
    );
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
      <ModalComp.Header close={close}>
        <h3>Remove card number from Customer</h3>
      </ModalComp.Header>
      <ModalComp.Body>
        <div className='my-2'>
          <h5>
            Are you sure you want to delete card number from Customer ID:
            {customerId}?
          </h5>
        </div>
      </ModalComp.Body>
      <ModalComp.Footer>
        <Button
          onClick={() => {
            removeCardNumberFromCustomer(customerId);
          }}
          color='primary'
          size='sm'>
          Yes
        </Button>
      </ModalComp.Footer>
    </ModalComp>
  );
});
