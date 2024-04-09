import { useState } from 'react';
import axios from 'axios';

const baseURL = 'https://hotelease.onrender.com';

const styles = {
    primaryButton: {
        backgroundColor: '#53a8b6',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        marginTop:'10px'
    },
    cancelButton: {
        backgroundColor: 'gray',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin : '10px'
    },
    formControl: {
        marginBottom: '10px',
        border : 'solid 1px',
        padding: '10px',
        borderRadius : '5px'
    },
    input: {
        padding: '10px',
        border: `1px solid #53a8b6`,
        borderRadius: '5px',
        width: 'calc(100% - 22px)', // Adjust for padding and border
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    formSection: {
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '5px',        
    },
    form: {
        border: '1px solid #53a8b6',
        borderRadius: '5px',
        padding: '20px',
        marginBottom: '20px',
    },
    message: {
        padding: '10px',
        borderRadius: '5px',
        border: `1px solid #53a8b6`,
        color: '#53a8b6',
        marginBottom: '10px',
    },
};

export default function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createUserOption, setcreateUserOption] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserMobileNumber, setNewUserMobileNumber] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [userCreationMsg, setUserCreationMsg] = useState('');
    const [checkInOption, setCheckInOption] = useState(false);
    const [checkInEmail, setCheckInEmail] = useState('');
    const [checkInRoomNumber, setCheckInRoomNumber] = useState('');
    const [checkInMsg,setCheckInMsg] = useState('');
    const [checkOutEmail, setCheckOutEmail] = useState('');
    const [checkOutRoomNumber,setCheckOutRoomNumber] = useState('');
    const [checkOutMsg,setCheckOutMsg] = useState('');
    const [checkOutOption,setCheckOutOption] = useState(false);
    const [scheduledServices, setScheduledServices] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeMobileNumber, setEmployeeMobileNumber] = useState('');
    const [employeeJoinDate, setEmployeeJoinDate] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState(0);
    const [employeeCreateMsg, setEmployeeCreateMsg] = useState('');
    const [employeeCreateOption, setEmployeeCreateOption] = useState(false);
    const handleLogin = async (e) => {
        // console.log(email, password)
        e.preventDefault(); // Prevent the form from causing a page reload

        try {
            const response = await axios.post(`${baseURL}/admin/verify-admin-login`, { "email" : email, "password" : password });
            if (response.data.success) {
                setLoggedIn(true);
                setErrorMessage('');
            } 
            else if(response.data.failure) {
                // Handle case where login is unsuccessful but the server responds
                setErrorMessage(response.data.failure);
            }
            else if(response.data.error){
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.log(error);
            setErrorMessage('An error occurred during login.' || error.message);
        }
    };
    
    const handleCreateUser = async (e) => {
        e.preventDefault(); // Prevent the form from causing a page reload

        try {
            const response = await axios.post(`${baseURL}/admin/create-user`, { "email" : newUserEmail, "password" : newUserPassword, "mobileNumber" : newUserMobileNumber, "name" : newUserName });
            if (response.data.success) {
                setErrorMessage('');
                setcreateUserOption(false);
                setUserCreationMsg('User created successfully');
                setTimeout(() => {
                    setUserCreationMsg('');
                }, 3000);
            } 
            else if(response.data.failure) {
                // Handle case where login is unsuccessful but the server responds
                setErrorMessage(response.data.failure);
            }
            else if(response.data.error){
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            // Handle any errors that occur during the request
            console.log(error.response);
            setErrorMessage('An error occurred during login.');
        }        
    }
    function manageCreateOption(){
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserMobileNumber('');
        setNewUserName('');
        setcreateUserOption(true);
    }

    function manageCheckInOption(){
        setCheckInOption(true);
        setCheckInEmail('');
        setCheckInRoomNumber('');        
    }
    function manageCheckOutOption(){
        setCheckOutOption(true);
        setCheckOutEmail('');
        setCheckOutRoomNumber('');
    }

    function manageEmployeeCreateOption(){
        setEmployeeCreateOption((prev)=>!prev);
        setEmployeeEmail('');
        setEmployeeName('');
        setEmployeeSalary(0);
        setEmployeeJoinDate('');
        setEmployeeMobileNumber('');
    }

    async function handleCreateEmployee(e){
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/admin/create-employee`,{"name" : employeeName, "mobileNumber" : employeeMobileNumber, "email" : employeeEmail, "joinDate" : employeeJoinDate, "salary" : employeeSalary});
            if(response.data.success){
                setEmployeeCreateMsg('Employee create successfuly');
                setEmployeeEmail('');
                setEmployeeMobileNumber('');
                setEmployeeJoinDate('');
                setEmployeeSalary(0);
                setEmployeeName('');
                setTimeout(()=>setEmployeeCreateMsg(''),5000);
            }

        } catch (error) {
            setEmployeeCreateMsg(error.response || 'Unable to create employees right now');
            setEmployeeEmail('');
            setEmployeeMobileNumber('');
            setEmployeeJoinDate('');
            setEmployeeSalary(0);
            setEmployeeName('');            
            setTimeout(()=>setEmployeeCreateMsg(''),5000);
        }
    }

    async function handleCheckIn(e){
        e.preventDefault();
        try {
            const res = await axios.put(`${baseURL}/admin/check-in`,{"email":checkInEmail,"roomNumber" : checkInRoomNumber});
            if(res.data.success){
                setCheckInMsg('Check In Successfull');
                setCheckInEmail('');
                setCheckInRoomNumber('');
                setTimeout(()=>setCheckInMsg(''),5000);
                setCheckInOption(false);
            }
            if(res.data.failure || res.data.error) {
                console.log(res.data.failure || res.data.error);
                setCheckInMsg(res.data.failure || res.data.error);
                setCheckInEmail('');
                setCheckInRoomNumber('');
                setTimeout(()=>setCheckInMsg(''),5000);            
                setCheckInOption(false);
            }            
        } catch (error) {
            console.log(error);
            setCheckInMsg(error?.respone?.data?.failure || 'An Error occured during check-in');
            setTimeout(()=>{
                setCheckInOption(false);
                setCheckInRoomNumber('');
                setCheckInEmail('');            
            },5000);
        }
    }

    async function handleCheckOut(e) {
        e.preventDefault();
        try {
            const res = await axios.put(`${baseURL}/admin/check-out`, {
                "email": checkOutEmail, // Assuming you have a state or variable for this
                "roomNumber": checkOutRoomNumber // And for this
            });
            if (res.data.success) {
                setCheckOutMsg('Check Out Successful'); // Assuming you have a state for this message
                setCheckOutEmail(''); // Assuming a state for the email being used to check out
                setCheckOutRoomNumber(''); // And a state for the room number
                setTimeout(() => setCheckOutMsg(''), 5000);
                setCheckOutOption(false);
            }
            if (res.data.failure || res.data.error) {
                console.log(res.data.failure || res.data.error);
                setCheckOutMsg(res.data.failure || res.data.error); // Use the same message state as above
                setCheckOutEmail('');
                setCheckOutRoomNumber('');
                setTimeout(() => setCheckOutMsg(''), 3000);
                setCheckOutOption(false);
            }
        } catch (error) {
            console.log(error);
            // Corrected typo from 'respone' to 'response' in the error handling
            setCheckOutMsg(error?.response?.data?.failure || 'An error occurred during check-out');
        }
    }
    
    const fetchScheduledServices = async () => {
        try {
            const res = await axios.get(`${baseURL}/admin/get-scheduled-services`);
            setScheduledServices(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {
            loggedIn ? 
            <div style={{display : 'flex', flexDirection : 'column', gap : '20px',minHeight : '100vh', overflow :'scroll', marginBottom : 'auto'}}>
                <h1>Welcome to Admin Dashboard</h1>
                
                <div>
                    <h2>Logged in as {email}</h2>
                </div>
                

                <button onClick={manageCreateOption} style={styles.primaryButton}>Create User</button>
                {createUserOption && (
                    <div>
                        <h3>Create User</h3>
                        <form style={styles.form} onSubmit={handleCreateUser}>
                            <label style={styles.label} >Name:</label>
                            <input style={styles.input}
                                type="text"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                required
                            />
                            <label style={styles.label} >Mobile Number:</label>
                            <input style={styles.input}
                                type="text"
                                value={newUserMobileNumber}
                                onChange={(e) => setNewUserMobileNumber(e.target.value)}
                                required
                            />
                            <label style={styles.label} >Email:</label>
                            <input style={styles.input}
                                type="email"
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                required
                            />
                            <label style={styles.label} >Password:</label>
                            <input style={styles.input}
                                type="password"
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                required
                            />
                            <button type="submit" style={styles.formSection}>Submit</button>
                            <button onClick={() => setcreateUserOption(false)} style={styles.cancelButton}>Cancel</button>
                        </form>                        
                    </div>                    
                )}
                {userCreationMsg && <p style={styles.message} >{userCreationMsg}</p>}
                {/* --------------------------------------------- */}
                <button onClick={manageCheckInOption} style={styles.primaryButton}>Check In </button>
                {checkInOption && (
                    <div>
                        <h3>Check In</h3>
                        <form style={styles.form} onSubmit={handleCheckIn}>
                            <label style={styles.label} >Email:</label>
                            <input style={styles.input}
                                type="email"
                                required
                                onChange={(e)=>setCheckInEmail(e.target.value)}
                            />
                            <label style={styles.label} >Room Number :</label>
                            <input style={styles.input}
                                type="text"
                                required
                                onChange={(e)=>setCheckInRoomNumber(e.target.value)}
                            />                            
                            <button type="submit" style={styles.formControl}>Check In</button>
                            <button onClick={() => setCheckInOption(false)} style={styles.cancelButton}>Cancel</button>
                        </form>                        
                    </div>                    
                )}
                {checkInMsg && <p style={styles.message} >{checkInMsg}</p>}
                {/* --------------------------------------- */}
                <button onClick={manageCheckOutOption} style={styles.primaryButton}>Check Out</button>
                {checkOutOption && (
                    <div>
                        <h3>Check Out</h3>
                        <form style={styles.form} onSubmit={handleCheckOut}>
                            <label style={styles.label} >Email:</label>
                            <input style={styles.input}
                                type="email"
                                required
                                onChange={(e) => setCheckOutEmail(e.target.value)}
                            />
                            <label style={styles.label} >Room Number :</label>
                            <input style={styles.input}
                                type="text"
                                required
                                onChange={(e) => setCheckOutRoomNumber(e.target.value)}
                            />                            
                            <button type="submit" style={styles.formControl}>Check Out</button>
                            <button onClick={() => setCheckOutOption(false)} style={styles.cancelButton}>Cancel</button>
                        </form>                        
                    </div>                    
                )}
                {checkOutMsg && <p style={styles.message} >{checkOutMsg}</p>}

                <button onClick={fetchScheduledServices} style={styles.primaryButton}>See Scheduled Services</button>
                <div>
                    {scheduledServices.length > 0 && <h3>Scheduled Services</h3>}
                    {   
                        scheduledServices && scheduledServices.length > 0 && (
                            scheduledServices?.map((service) => (
                                <div key={service._id} style={{border : 'solid 1px', padding: '20px', textAlign : 'left' , borderRadius : '5px'}}>
                                    <p style={styles.message} >Room Number: {service.roomNumber}</p>
                                    <p style={styles.message} >Scheduled Time: {new Date(service.scheduledTime).toLocaleString()}</p>
                                    <p style={styles.message} >Status: {service.status}</p>
                                    <p style={styles.message} >Type of scheduled service: {service.typeofSchedule.toUpperCase()}</p>
                                </div>
                            ))
                        )
                    }
                    {
                        scheduledServices.length > 0 && <button onClick={()=>setScheduledServices([])} style={styles.cancelButton}>Close</button>
                    }                    
                </div>
                {/* ---------------------------------- */}
                <button onClick={manageEmployeeCreateOption} style={styles.primaryButton}>Create an Employee</button>
                { employeeCreateOption &&
                <form style={styles.form} onSubmit={handleCreateEmployee}>
                    <div>
                        <label htmlFor="employeeName">Name:</label>
                        <input style={styles.input}
                            id="employeeName"
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeEmail">Email:</label>
                        <input style={styles.input}
                            id="employeeEmail"
                            type="email"
                            value={employeeEmail}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeMobileNumber">Mobile Number:</label>
                        <input style={styles.input}
                            id="employeeMobileNumber"
                            type="tel"
                            value={employeeMobileNumber}
                            onChange={(e) => setEmployeeMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeJoinDate">Join Date:</label>
                        <input style={styles.input}
                            id="employeeJoinDate"
                            type="date"
                            value={employeeJoinDate}
                            onChange={(e) => setEmployeeJoinDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="employeeSalary">Salary:</label>
                        <input style={styles.input}
                            id="employeeSalary"
                            type="number"
                            value={employeeSalary}
                            onChange={(e) => setEmployeeSalary(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.formSection}>Create Employee</button>
                    <button onClick={manageEmployeeCreateOption} style={styles.cancelButton}>Cancel</button>
                </form>
                }
                {
                    loggedIn && 
                    <button style={styles.primaryButton} onClick={()=>setLoggedIn(false)}>Log out</button>
                }
                {employeeCreateMsg && <p style={styles.message} >{employeeCreateMsg}</p>}
            </div>
            :
            // --- Not Logged In Option --
            <div style={{minHeight:'70vh'}}>
                <form style={styles.form} onSubmit={handleLogin}>
                        <label style={styles.label} >Email:</label>
                        <input style={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label style={styles.label} >Password:</label>
                        <input style={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    <button type="submit" style={styles.primaryButton}>Login</button>
                </form>
                <div>
                    {errorMessage && <p style={styles.message} >{errorMessage}</p>}
                </div>                
            </div>
            }

        </div>
    );
}
