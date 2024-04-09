import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ userName }) {
    const navigate = useNavigate();

    const handleRoomBooking = () => {
        navigate("/user/bookroom");
        console.log("Room booking functionality");
    };

    const handleTableBooking = () => {
        navigate("/user/bookrestaurant");
        console.log("Restaurant table booking functionality");
    };

    return (
        <div className="dashboard-container">
            <style>{`
                .dashboard-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    background: linear-gradient(45deg, #ffffff, #f0f8ff);
                    min-height: 80vh;
                }

                .title {
                    font-size: 60px;
                    margin-bottom: 30px;
                    color: #53a8b6;
                }

                .options {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .icon {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 20px;
                }

                .option-btn {
                    background-color: #53a8b6;
                    border: none;
                    color: white;
                    padding: 15px 30px;
                    border-radius: 10px;
                    cursor: pointer;
                    margin: 0 20px;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
                }

                .option-btn:hover {
                    background-color: #4481eb;
                    transform: translateY(-2px);
                }
            `}</style>
            
            <h2 className="title">Welcome! {userName}</h2>
            <div className="options">
                <div>
                    <img src="/hotel.png" alt="Hotel" className="icon" />
                    <button className="option-btn" onClick={handleRoomBooking}>Book Room</button>
                </div>
                <div>
                    <img src="/vegetarian.png" alt="Restaurant" className="icon" />
                    <button className="option-btn" onClick={handleTableBooking}>Book Restaurant Table</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
