import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

function BookRestaurant() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const images = ["table1", "table2", "table3", "table4"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [email, setEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);

    useEffect(() => {
        const fetchRestaurantTables = async () => {
            try {
                const response = await fetch("https://hotelease.onrender.com/get-restaurant-tables");
                if (!response.ok) {
                    throw new Error("Failed to fetch tables");
                }
                const data = await response.json();
                setTables(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tables:", error);
                setLoading(false);
            }
        };

        fetchRestaurantTables();
    }, []);

    const handleImageChange = (direction) => {
        if (direction === "next") {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (direction === "prev") {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const handleTableBooking = (tableNumber) => {
        setEmail('');
        setSelectedDate(null);
        setSelectedTable(tableNumber);
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleBookingConfirm = async () => {
        const formattedDate = selectedDate.toISOString();
        const bookingData = {
            "email": email,
            "tableNumber": selectedTable,
            "bookedOn": formattedDate
        };

        try {
            const response = await axios.put('https://hotelease.onrender.com/user/book-restaurant',bookingData);
            console.log(response )
            if (response && response.data && response.data.success) {
                setBookingStatus(response.data.success.toUpperCase());
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.failure) {
                setBookingStatus(error.response.data.failure.toUpperCase());
            }
            if (error.response && error.response.data && error.response.data.error) {
                setBookingStatus(error.response.data.error.toUpperCase());
            }
            else {
                setBookingStatus('Failed to book room. Please try again later.');
            }
        }
    };
    
    return (
        <div className="book-room-container splash" style={{ padding: "20px", textAlign: "center", fontSize: "18px", paddingBottom: "200px"}}>
            <h2 style={{ color: "#53a8b6", fontSize: "24px" }}>Available Tables</h2>
            <div className="slideshow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button onClick={() => handleImageChange("prev")}>&#10094;</button>
                <img
                    src={`/${images[currentImageIndex]}.jpg`}
                    alt="Table"
                    style={{ width: "600px", height: "450px", margin: "0 20px", cursor: "pointer", boxShadow: "5px 5px 15px 5px rgba(0, 0, 0, 0.5)", borderRadius: "10px" }}
                    onClick={() => handleImageChange("next")}
                />
                <button onClick={() => handleImageChange("next")}>&#10095;</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {tables.map((table) => (
                        <li key={table.tableNumber}>
                            Table {table.tableNumber}
                            <button onClick={() => handleTableBooking(table.tableNumber)} style={{ backgroundColor: "#53a8b6", color: "#fff", border: "none", padding: "10px", borderRadius: "5px", margin: "5px 0", cursor: "pointer" }}>Book Table</button>
                        </li>
                    ))}
                </ul>
            )}
            {showDialog && (
                <div className="dialog" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.2)" }}>
                    <div className="dialog-content">
                        <h3 style={{ color: "#53a8b6" }}>Book Table {selectedTable}</h3>
                        <label style={{ marginRight: "10px" }}>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "20px" }} />
                        <label style={{ marginRight: "10px" }}>Date:</label>
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "20px" }} />
                        <div>
                            <button onClick={handleBookingConfirm} style={{ backgroundColor: "#53a8b6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", margin: "10px", cursor: "pointer" }}>Book</button>
                            <button onClick={handleDialogClose} style={{ backgroundColor: "#ccc", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", margin: "10px", cursor: "pointer" }}>Cancel</button>
                        </div>
                        {bookingStatus && (
                            <p style={{ color: bookingStatus === "success" ? "green" : "red" }}>{bookingStatus}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookRestaurant;
