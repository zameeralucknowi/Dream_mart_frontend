import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import {publicRequest} from '../requestMethods'
import {useNavigate} from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

const  Already = styled.p` 
  margin-right:75px;
`

const Register = () => {
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState('');
  const [error,setError] = useState('')
  const navigate = useNavigate();

  const handleRegister = async(e) =>{
      e.preventDefault();

      if(password!==confirmPassword){
        setError('Password should be Matched')
        return;
      }

      try {
        const res  = await publicRequest.post('auth/register',{userName,password,email})
        if(res && res.status===409){
            console.log(res)
            setError('Email already exists.Try with another')
        }
        else if(res && res.status===201){
          navigate('/login')
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setError('Email already exists.Try with another!!');
        } else {
          setError('An error occurred. Please try again.');
        }
        console.error('Error:', error);
      }
  }
  return (
    <Container>
      <Wrapper>
      <Error>{error}</Error>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="username" onChange={(e)=>setUserName(e.target.value)} />
          <Input placeholder="email"  type="email" onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
          <Input placeholder="confirm password" type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Already>Already Have an Account?<Link href="/login" > LOGIN</Link></Already>
          <Button onClick={handleRegister} >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
///
