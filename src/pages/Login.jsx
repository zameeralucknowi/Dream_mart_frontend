import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../redux/apiCalls'
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
  color:green;
  cursor:not-allowed;
  }
`;

const Para = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.div`
color : red;
`
const Test = styled.div`
  color: blue;
  margin-bottom: 20px;
`;

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();

  const handleLogin =(e)=>{
    e.preventDefault();
    login(dispatch,{email,password});
  }

  const {isFetching,error} = useSelector(state => state.user);

  return (
    
    <Container>
      <Wrapper>
      <Test>
          <p>Email: admin@gmail.com</p>
          <p>Password: admin</p>
        </Test>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" type="email" onChange={(e)=>setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong</Error>}
          <Link  to={'/register'} >
           <Para>CREATE A NEW ACCOUNT</Para>
          </Link>
       
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
///