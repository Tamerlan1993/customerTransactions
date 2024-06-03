import { ReactNode } from 'react';
import { ModalHeader, ModalHeaderProps } from 'reactstrap';

interface IHeader {
  headerProps?: ModalHeaderProps;
  close?: () => void;
  children: ReactNode;
}

function Header({ headerProps = {}, close, children }: IHeader) {
  return (
    <ModalHeader
      tag={'div'}
      {...headerProps}
      close={
        close && (
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            onClick={close}></button>
        )
      }>
      {children}
    </ModalHeader>
  );
}

export default Header;
