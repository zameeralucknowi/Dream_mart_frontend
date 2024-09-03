import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined, LocalShipping } from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from '../redux/userRedux';
import { persistor } from '../redux/store';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px", padding: "3px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;  /* Added space-around for even spacing */
  ${mobile({ flex: 2, justifyContent: "center", gap: "10px" })} /* Added gap for better spacing on mobile */
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Button = styled.button`
  color: black;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 0.8rem; /* Smaller font size */
  cursor: pointer;
  background: none;
  transition: transform 0.3s ease;
  margin-left: 10px; /* Reduced margin */

  &:hover {
    transform: scale(1.05);
  }

  ${mobile({
    width: "auto", /* Adjusted width for better fit */
    padding: "5px 8px", /* Adjusted padding for better fit */
    fontSize: "0.7rem", /* Smaller font size for mobile */
    marginLeft: "5px" /* Further reduced margin */
  })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    persistor.purge();
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Dream Mart</Logo>
        </Center>
        <Right>
          {!user &&
            <>
              <Link to={'/register'}>
                <MenuItem>
                  <HowToRegIcon />
                </MenuItem>
              </Link>
              <Link to={'/login'}>
                <MenuItem>
                  <LoginIcon />
                </MenuItem>
              </Link>
            </>
          }
          {user &&
            <>
              <Link to={'/cart'}>
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <Link to={'/orders'}>
                <MenuItem>
                  <LocalShipping />
                </MenuItem>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
