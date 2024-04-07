import React from "react";
import { useNavigate } from "react-router-dom";
function Dashboard({ userName }) {
    const navigate= useNavigate();
    const handleRoomBooking = () => {
        // Implement room booking functionality
        navigate("/bookroom");
        console.log("Room booking functionality");
    };

    const handleTableBooking = () => {
        // Implement restaurant table booking functionality
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
                }

                .title {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #53a8b6;
                }

                .options {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .icon {
                    width: 40px;
                    height: 40px;
                    margin-bottom: 10px;
                }

                .option-btn {
                    background-color: #53a8b6;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 0 10px;
                    transition: background-color 0.3s ease;
                }

                .option-btn:hover {
                    background-color: #4481eb; /* Change color on hover */
                }
            `}</style>
            
            <h2 className="title">Welcome {userName}</h2>
            <div className="options">
                <div>
                    <img src="hotel.png" alt="Hotel" className="icon" />
                    <button className="option-btn" onClick={handleRoomBooking}>Book Room</button>
                </div>
                <div>
                    <img src="vegetarian.png" alt="Restaurant" className="icon" />
                    <button className="option-btn" onClick={handleTableBooking}>Book Restaurant Table</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
