import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link from React Router

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

const FailedMessage = styled.div`
    margin-bottom: 20px; /* Space between message and button */
`;

const ReturnButton = styled(Link)`
    text-decoration: none;
    color: white;
    background-color: #f44336; /* Red background */
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d32f2f; /* Darker red on hover */
    }

    @media (min-width: 768px) {
        font-size: 18px; /* Adjust font size for larger screens */
    }
`;

const Failed = () => {
    return (
        <Container>
            <FailedMessage>Payment Failed</FailedMessage>
            <ReturnButton to="/cart">Return to Cart</ReturnButton>
        </Container>
    );
};

export default Failed;