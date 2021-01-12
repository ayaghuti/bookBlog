import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const [user, setUser] = useState(auth.user);
  // useEffect(() => {
  //   if(!user) {
  //     console.log('invalid user');
  //     dispatch(logoutUser());
  //   }
  // }, [user, dispatch])

  const logout = () => {
    dispatch(logoutUser());
  }
 
  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{ auth.user ? `Welcome ${auth.user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink href='/' onClick={logout}>Logout</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/create">New Post</NavLink>
      </NavItem>
    </>
  );
  const guestLinks = (
    <>
      <NavItem>
        <NavLink href="/signup">Sign Up</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/signin">Sign In</NavLink>
      </NavItem>
    </>
  );    
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">BookBlog</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                { auth.isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>      
    );
  
}


export default AppNavbar;