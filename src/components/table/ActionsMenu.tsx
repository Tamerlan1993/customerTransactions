import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

export interface IActions {
  label: string;
  hide?: boolean;
  onClick: () => void;
}

const ActionsMenu = ({ actions }: { actions: IActions[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((isOpen) => !isOpen);

  const hasAccessAllActions = actions.every((action) => action.hide);

  return (
    <>
      {hasAccessAllActions ? null : (
        <Dropdown
          isOpen={isOpen}
          toggle={toggle}
          tag='div'>
          <DropdownToggle
            tag={'div'}
            role='button'>
            <GripVertical />
          </DropdownToggle>
          <DropdownMenu>
            {actions.map((action) => {
              if (action.hide) {
                return null;
              } else {
                return (
                  <DropdownItem
                    className='my-1'
                    key={action.label}
                    onClick={() => action.onClick()}>
                    {action.label}
                  </DropdownItem>
                );
              }
            })}
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
};

export default ActionsMenu;
