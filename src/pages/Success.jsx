import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from React Router
import {publicRequest} from '../requestMethods'
import { useSelector } from 'react-redux';


const Container = styled.div`
    font-weight: 100;
    font-size: 5vw; /* Make the font size responsive to screen width */
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column; /* Allow column layout */
    justify-content: center;
    align-items: center;
    text-align: center; /* Center the text within the container */
    padding: 20px; /* Add padding for small screens */
    box-sizing: border-box;

    @media (min-width: 768px) {
        font-size: 40px; /* Larger font size for wider screens */
    }
`;

const SuccessMessage = styled.div`
    margin-bottom: 20px; /* Space between message and button */
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

const Success = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state=>state.user.currentUser);
    const cart = useSelector(state=>state.cart)

    useEffect(() => {
        const getTransactions = async () => {
             const queryParams = new URLSearchParams(location.search);
             const paymentId = queryParams.get('paymentId');

             if(paymentId){
                try {
                    const res = await publicRequest.get(`checkout/transactions?paymentId=${paymentId}`);
                    if (res && res.data) {
                        await publicRequest.post('orders/create',{
                            userId : user._id,
                            products : cart.products.map(item=>({
                                productId : item._id,
                                quantity : item.quantity
            
                        })),
                        amount : cart.total,
                        address: res.data.transactions.item_list.shipping_address  
                        })
                    }
                } catch (err) {
                    console.error(err);
                    navigate('/failed')
                }
             }
             else{
                navigate('/failed')
             }
        };
        getTransactions();
    },[]);
   
    return (
        <Container>
            <SuccessMessage>Payment Successful</SuccessMessage>
            <ContinueButton to="/">Continue Shopping</ContinueButton>
        </Container>
    );
};

export default Success;