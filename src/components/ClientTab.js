// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientTab = () => {
  const [status, setStatus] = useState("Loading....");
  const [myStatus, setMyStatus] = useState("Not Registered");
  const [name, setName] = useState("");
  const [InstructorName, setInstructorName] = useState("");
  const [InstructorRating, setInstructorRating] = useState("");
  const [invitees, setInvitees] = useState(0);
  const [invitedBy, setInvitedBy] = useState(null);

  // Define a function to fetch status data
  const fetchWorkoutStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/on-demand/getCurrentWorkoutStatus"
      );
      const { data } = response;
      console.log(data);
      setStatus(data); // Assuming the response has a 'status' property
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const fetchMyStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/client/myStatus/" + name
      );
      const { data } = response;
      console.log(data);
      setMyStatus(data); // Assuming the response has a 'status' property
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const declareAvailability = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/client/register/" + name+'/'+invitees+'/'+(invitedBy?invitedBy:'None')
      );
      const { data } = response;
      console.log(data);
      setMyStatus(data); // Assuming the response has a 'status' property
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }; 
  
  const submitRating = async () => {
    try {
      await axios.get(
        "http://localhost:3002/client/rate/" + InstructorName+'/'+InstructorRating
      );
      
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchMyStatus();
    fetchWorkoutStatus();
    const interval = setInterval(fetchWorkoutStatus, 5000); // Fetch every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h1>Client Tab</h1>
      {/* Add your instructor-specific components here */}
      <div>{status}</div>
      <br />
      <br />

      <input value={invitedBy} placeholder="Who Invited You" onChange={(e) => setInvitedBy(e.target.value)}></input>
      <br/>
      <input value={name} placeholder="your Name" onChange={(e) => setName(e.target.value)}></input>
      <br/>
      <input value={invitees==0?'':invitees} placeholder="How many people to invite" onChange={(e) => setInvitees(e.target.value)}></input>
      <br/>
      <button onClick={declareAvailability}>Register</button>
      <button onClick={fetchMyStatus}>Check Status</button>
      <br />
      <br />
      <div>My Status: {myStatus}</div>
      <br />
      <br />
      <input
        value={InstructorName}
        placeholder="Instructor Name"
        onChange={(e) => setInstructorName(e.target.value)}
      ></input>
      <input
        value={InstructorRating}
        placeholder="Rating"
        onChange={(e) => setInstructorRating(e.target.value)}
      ></input>
      <button onClick={submitRating}>Submit</button>
    </div>
  );
};

export default ClientTab;
