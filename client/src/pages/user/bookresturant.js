import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookResturant() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const images = ["table1", "table2", "table3", "table4"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [email, setEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

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
        setSelectedTable(tableNumber);
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleBookingConfirm = () => {
        // Convert selectedDate to string in ISO format
        const formattedDate = selectedDate.toISOString();
    
        // Send booking data to backend
        const bookingData = {
            email: email,
            tableNumber: selectedTable,
            bookedOn: formattedDate
        };
    
        fetch("https://hotelease.onrender.com/user/book-restaurant", {
            method: "POST",
            body: JSON.stringify(bookingData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Booking successful:", data);
            alert("Table successfully booked!");
            setShowDialog(false);
        })
        .catch(error => {
            console.error("Error booking Table:", error);
            alert("Failed to book Table. Please try again later.");
            setShowDialog(false);
        });
    };
    
    return (
        <div className="book-room-container splash" style={{ padding: "20px" }}>
            <h2 style={{ color: "#53a8b6" }}>Available Tables</h2>
            <div className="slideshow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button onClick={() => handleImageChange("prev")}>&#10094;</button>
                <img
                    src={`/${images[currentImageIndex]}.jpg`}
                    alt="Room"
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
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Book Table {selectedTable}</h3>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Date:</label>
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                        <div>
                            <button onClick={handleBookingConfirm}>Book</button>
                            <button onClick={handleDialogClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookResturant;
