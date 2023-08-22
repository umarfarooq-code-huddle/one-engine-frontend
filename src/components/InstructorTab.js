// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstructorTab = () => {
    const [status,setStatus] = useState('Loading...');
    const [myStatus,setMyStatus] = useState('Not Available');
    const [myRating,setMyRating] = useState(0);
    const [name,setName] = useState('');
    const [role,setRole] = useState('');
    const [workout,setWorkout] = useState('');

   // Define a function to fetch status data
   const fetchAlertStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3002/on-demand/getCurrentAlertStatus');
      const { data } = response;
      console.log(data);
      setStatus(data); // Assuming the response has a 'status' property
    
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const fetchMyStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3002/instructor/myStatus/'+name);
      const { data } = response;
      console.clear();
      console.log(data);
      if(data.avgRate)
        setMyRating(data.avgRate)
      if(data.role)
        setRole(data.role)
      if(data.workout)
        setWorkout(data.workout)
      setMyStatus(data.status); // Assuming the response has a 'status' property
    
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const declareAvailability = async()=>{
    try {
        const response = await axios.get('http://localhost:3002/instructor/setAvailable/'+name);
        const { data } = response;

        setMyStatus(data); // Assuming the response has a 'status' property
      
      } catch (error) {
        console.error('Error fetching status:', error);
      }
  } 

    useEffect(()=>{
        fetchMyStatus();
        fetchAlertStatus();
        const interval = setInterval(fetchAlertStatus, 5000); // Fetch every 5 seconds (adjust as needed)

        return () => clearInterval(interval);
    },[])
    return (
    <div>
      <h1>Instructor Tab</h1>
      {/* Add your instructor-specific components here */}
      <div>
        {status}
      </div>
      <br/><br/>

      <input value={name} onChange={(e)=>setName(e.target.value)}></input> 
      <button onClick={declareAvailability}>Declare Available</button>
      <button onClick={fetchMyStatus}>Check Available</button>
      <br/><br/>
      <div>

       My Status: {myStatus}
      </div>
      <div>

       My Rating: {myRating}
      </div>

      {role!=''?<div>
        Role Assigned is : {role}
      </div>:''}

      {workout!=''?<div>
        Workout Assigned is : {workout}
      </div>:''}
    </div>
  );
}

export default InstructorTab;
