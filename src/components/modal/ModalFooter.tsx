import { ReactNode } from 'react';
import { ModalFooter, ModalFooterProps } from 'reactstrap';

interface IModalBody {
  footerProps?: ModalFooterProps;
  children: ReactNode;
}

function Footer({ footerProps, children }: IModalBody) {
  return <ModalFooter {...footerProps}>{children}</ModalFooter>;
}

export default Footer;
