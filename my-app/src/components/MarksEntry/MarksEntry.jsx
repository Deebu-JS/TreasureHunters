import React, { useState } from 'react';
import "./MarksEntry.css"; // Optional: Add custom styles for the login form
function MarksEntry({ subjects, onAddStudent }) {
  const [formData, setFormData] = useState({ name: '', marks: {} });

  const handleMarkChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      marks: { ...prev.marks, [subject]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent(formData);
    setFormData({ name: '', marks: {} }); // Reset form
    alert("Student record saved successfully!");
  };

  return (
    <section className="form-section card">
      <h2>Enter Student Marks</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name:</label>
          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        
        <div className="form-group dynamic-grid">
          {subjects.map(subject => (
            <div key={subject}>
              <label>{subject} (0-100):</label>
              <input 
                type="number" min="0" max="100" 
                value={formData.marks[subject] || ''} 
                onChange={(e) => handleMarkChange(subject, e.target.value)} 
                required 
              />
            </div>
          ))}
        </div>
        <button type="submit" className="submit-btn">Save Student Record</button>
      </form>
    </section>
  );
}

export default MarksEntry;