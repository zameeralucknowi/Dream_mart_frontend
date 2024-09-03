import React, { useEffect, useState } from 'react'
import {publicRequest} from '../requestMethods'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

const OrderCard = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const OrderDetails = styled.div`
  margin-bottom: 10px;
`;

const OrderId = styled.p`
  font-weight: bold;
`;

const OrderStatus = styled.p`
  color: ${(props) => (props.status === 'pending' ? 'orange' : 'green')};
`;

const OrderAmount = styled.p`
  color: #333;
`;

const ProductList = styled.div`
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const ProductId = styled.span`
  font-size: 0.9em;
`;

const Quantity = styled.span`
  font-size: 0.9em;
  color: #555;
`;
const ContinueButton = styled(Link)`
    text-decoration: none;
    color: white;
    background-color: #4caf50; /* Green background */
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049; /* Darker green on hover */
    }

    @media (min-width: 768px) {
        font-size: 18px; /* Adjust font size for larger screens */
    }
`;

const Message = styled.h3`
  text-align: center;
`

const Orders = () => {
    const cart = useSelector(state=>state.cart)
    const [orders,setOrders] = useState([]);
    const user = useSelector(state=>state.user.currentUser);

    useEffect(()=>{
        const getOrders = async ()=>{
            try {
                const res = await publicRequest.get(`orders/find/${user._id}`);
                if(res){
                  
                    setOrders(res.data)
                }       
            } catch (error) {
                console.log(error)
            }
        }
        getOrders();
    },[])
  return (
    <OrdersContainer>
    {orders.map((order) => (
      <OrderCard key={order._id}>
        <OrderDetails>
          <OrderId>Order ID: {order._id}</OrderId>
          <OrderStatus>Status: {order.status}</OrderStatus>
          <OrderAmount>Order Amount: ${order.amount}</OrderAmount>
        </OrderDetails>
        <ProductList>
          {order.products.map((product) => (
            <ProductItem key={product.productId}>
              <ProductId>Product ID: {product.productId}</ProductId>
              <Quantity>Quantity: {product.quantity}</Quantity>
            </ProductItem>
          ))}
        </ProductList>
      </OrderCard>
    ))}
    {orders.length==0 && <Message>No orders Yet</Message>}
    <ContinueButton to="/">Continue Shopping</ContinueButton>
  </OrdersContainer>
  )
}

export default Orders;
