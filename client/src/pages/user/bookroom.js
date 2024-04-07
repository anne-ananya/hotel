import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookRoom() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const images = ["room", "room1", "room2", "room3"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [email, setEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("https://hotelease.onrender.com/get-rooms");
                if (!response.ok) {
                    throw new Error("Failed to fetch rooms");
                }
                const data = await response.json();
                setRooms(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleImageChange = (direction) => {
        if (direction === "next") {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (direction === "prev") {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    const handleRoomBooking = (roomNumber) => {
        setSelectedRoom(roomNumber);
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
            roomNumber: selectedRoom,
            bookedOn: formattedDate // Change 'date' to 'bookedOn'
        };
    
        fetch("https://hotelease.onrender.com/user/book-room", {
            method: "POST",
            body: JSON.stringify(bookingData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Booking successful:", data);
            alert("Room successfully booked!");
            setShowDialog(false);
        })
        .catch(error => {
            console.error("Error booking room:", error);
            alert("Failed to book room. Please try again later.");
            setShowDialog(false);
        });
    };
    
    return (
        <div className="book-room-container splash" style={{ padding: "20px" }}>
            <h2 style={{ color: "#53a8b6" }}>Available Rooms</h2>
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
                    {rooms.map((room) => (
                        <li key={room.roomNumber}>
                            Room {room.roomNumber}
                            <button onClick={() => handleRoomBooking(room.roomNumber)} style={{ backgroundColor: "#53a8b6", color: "#fff", border: "none", padding: "10px", borderRadius: "5px", margin: "5px 0", cursor: "pointer" }}>Book Room</button>
                        </li>
                    ))}
                </ul>
            )}
            {showDialog && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h3>Book Room {selectedRoom}</h3>
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

export default BookRoom;
