// src/App.js
import React, { useState } from 'react';
import './App.css';
import InstructorTab from './components/InstructorTab';
import ClientTab from './components/ClientTab';

function App() {
  const [activeTab, setActiveTab] = useState('instructor');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  return (
    <div className="App">
      <div className="flex space-x-4">
        <button
          className={`btn btn-blue ${
            activeTab === 'instructor' ? 'bg-blue-500' : 'bg-gray-300'
          } p-2 rounded-md`}
          onClick={() => handleTabChange('instructor')}
        >
          Instructor
        </button>
        <button
          className={`${
            activeTab === 'client' ? 'bg-blue-500' : 'bg-gray-300'
          } p-2 rounded-md`}
          onClick={() => handleTabChange('client')}
        >
          Client
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'instructor' ? <InstructorTab /> : <ClientTab />}
      </div>
    </div>
  );
}

export default App;
