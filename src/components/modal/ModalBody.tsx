import { ReactNode } from 'react';
import { ModalBody, ModalBodyProps } from 'reactstrap';

interface IModalBody {
  bodyProps?: ModalBodyProps;
  children: ReactNode;
}

function Body({ bodyProps, children }: IModalBody) {
  return <ModalBody {...bodyProps}>{children}</ModalBody>;
}

export default Body;
