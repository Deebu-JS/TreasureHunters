import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import MarksEntry from './components/MarksEntry/MarksEntry.jsx';
import Results from './components/Results/Results.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subjects] = useState(['Math', 'Science', 'English', 'History']);
  const [students, setStudents] = useState([]);

  // Calculate overall grade
  const getOverallGrade = (average) => {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  };

  const addStudent = (studentData) => {
    let total = 0;
    const parsedMarks = {};

    subjects.forEach(sub => {
      const mark = parseFloat(studentData.marks[sub]) || 0;
      parsedMarks[sub] = mark;
      total += mark;
    });

    const average = (total / subjects.length).toFixed(2);
    
    const newStudent = {
      id: Date.now(),
      name: studentData.name,
      marks: parsedMarks,
      total,
      average: parseFloat(average),
      grade: getOverallGrade(average)
    };

    setStudents([...students, newStudent]);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        
        <Routes>
          <Route 
            path="/" 
            element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/entry" />} 
          />
          <Route 
            path="/entry" 
            element={isAuthenticated ? <MarksEntry subjects={subjects} onAddStudent={addStudent} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/results" 
            element={isAuthenticated ? <Results students={students} subjects={subjects} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;