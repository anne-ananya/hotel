import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(45deg, #f3f2f2, #cfd9df);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fefefe;
    padding: 40px 30px;
    border-radius: 10px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    font-size: 18px;
    padding: 15px;
    margin-bottom: 20px;
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    background: #fff;
    width: 300px;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.3s linear;

    &:focus {
        border-bottom: solid 1px rgb(182, 157, 230);
        outline: 0;
        box-shadow: 0 2px 6px -8px rgba(182, 157, 230, 0.45);
    }
`;

const LoginButton = styled.button`
    width: auto;
    padding: 20px 50px;
    margin-top: 20px;
    border-radius: 25px;
    text-align: center;
    background-color: #6a89cc;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #7589a2;
    }
`;

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://hotelease.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                navigate('/user/dashboard')
            } else {
                setErrorMessage("Email or password is incorrect");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container>
            <h2 style={{ color: "#000", fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <LoginButton type="submit">Login</LoginButton>
            </Form>
            {errorMessage && <p style={{ color: "red", marginTop: "20px" }}>{errorMessage}</p>}
        </Container>
    );
}

export default Login;
