import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { ROUTES } from '../../constants';

const links = [ROUTES.CUSTOMERS, ROUTES.TRANSACTIONS];

const Navbar = () => {
  return (
    <Nav
      className='me-auto d-flex gap-3 flex-row justify-content-center mb-3'
      navbar>
      {links.map((link) => {
        return (
          <NavItem key={nanoid()}>
            <NavLink
              className={({ isActive }) =>
                `nav-link p-2 ${isActive ? 'bg-light' : ''}`
              }
              to={link.path}>
              {link.label}
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default Navbar;
