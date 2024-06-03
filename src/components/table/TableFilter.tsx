import { Search } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

const TableFilter = ({
  children,
  onSubmit,
  isValid = true,
}: {
  onSubmit: () => void;
  children: ReactNode;
  isValid?: boolean;
}) => {
  const [show, setShow] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();

    isValid && setShow(false);
  };

  return (
    <>
      <div className='d-flex justify-content-end'>
        <Search
          onClick={() => setShow((x) => !x)}
          size={32}
        />
      </div>
      <Offcanvas
        isOpen={show}
        direction='end'
        toggle={() => setShow(false)}
        className='theme-light'>
        <OffcanvasHeader toggle={() => setShow(false)}>Filters</OffcanvasHeader>
        <OffcanvasBody>
          <form
            className='form d-flex gap-2 flex-column'
            onSubmit={handleSubmit}>
            {children}
            <Button
              color='primary'
              className='w-100 btn account__btn account__btn--small mt-2'
              type='submit'>
              Search
            </Button>
          </form>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default TableFilter;
