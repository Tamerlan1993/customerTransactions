import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'reactstrap';
import FormField from '../../../components/form/FormField';
import ModalComp from '../../../components/modal';
import { ICustomer } from '../../../constants/models';
import useOpenState from '../../../hooks/useOpenState';
import { setCustomers, useCustomers } from '../../../stores/customers';
import { CreateCustomerForm, createCustomerSchema } from '../validations';

export interface ICreateCustomerModal {
  open: () => void;
}

const CreateCustomer = forwardRef((_, ref) => {
  const { isOpen, toggle, close, open } = useOpenState();
  const customers = useCustomers((state) => state.customers);

  useImperativeHandle(ref, () => {
    return {
      open,
    };
  });

  const { control, reset, handleSubmit } = useForm<CreateCustomerForm>({
    defaultValues: {
      Name: '',
      Surname: '',
      GSMNumber: '',
      BirthDate: '',
    },
    resolver: yupResolver(createCustomerSchema),
    mode: 'onChange',
  });

  const onSubmit = (values: CreateCustomerForm) => {
    const newCustomer: Partial<ICustomer> = {
      ...values,
      CustomerID: `${customers?.length + 1}`,
    };
    setCustomers([newCustomer, ...customers].filter(Boolean) as ICustomer[]);
    handleClose();
  };

  const handleClose = () => {
    reset();
    close();
  };

  return (
    <ModalComp
      isOpen={isOpen}
      toggle={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalComp.Header close={handleClose}>
          <h3>Create Customer</h3>
        </ModalComp.Header>
        <ModalComp.Body>
          <div className='d-flex gap-2 flex-column'>
            <FormField
              control={control}
              label='Name'
              name='Name'
            />
            <FormField
              control={control}
              label='Surname'
              name='Surname'
            />
            <FormField
              label='GSM Number'
              control={control}
              name='GSMNumber'
            />
            <FormField
              label='Birth Date'
              control={control}
              name='BirthDate'
              inputProps={{
                type: 'date',
              }}
            />
          </div>
        </ModalComp.Body>
        <ModalComp.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button
            type='submit'
            color='primary'>
            Submit
          </Button>
        </ModalComp.Footer>
      </form>
    </ModalComp>
  );
});

export default CreateCustomer;
