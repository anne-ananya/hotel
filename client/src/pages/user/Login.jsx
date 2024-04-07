import React, { useState } from "react";

function Login() {
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
                // If authentication is successful, redirect to another page
                window.location.href = "/dashboard";
            } else {
                // If authentication fails, display an error message
                setErrorMessage("Email or password is incorrect");
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error("Error:", error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Login</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Login</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default Login;
