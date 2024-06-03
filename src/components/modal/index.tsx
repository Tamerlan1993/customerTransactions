import { ReactNode } from 'react';
import { Modal, ModalProps } from 'reactstrap';

import Body from './ModalBody';
import Footer from './ModalFooter';
import Header from './ModalHeader';

const defaultModalPropsValues: Partial<ModalProps> = {
  backdrop: true,
  keyboard: false,
  fade: true,
  centered: true,
};

interface IModalComp {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
  modalProps?: ModalProps;
  close?: () => void;
}

const ModalComp = ({
  toggle,
  isOpen,
  modalProps,
  children,
  close,
}: IModalComp) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        {...defaultModalPropsValues}
        {...modalProps}
        className={`${modalProps?.className ?? ''} theme-light`}>
        {close && (
          <div
            style={{
              width: '100%',
              textAlign: 'right',
            }}>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={close}
              style={{
                padding: '0.75rem',
                marginBottom: '-0.75rem',
              }}></button>
          </div>
        )}
        {children}
      </Modal>
    </div>
  );
};

ModalComp.Header = Header;
ModalComp.Body = Body;
ModalComp.Footer = Footer;

export default ModalComp;
