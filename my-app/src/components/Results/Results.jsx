import React from 'react';
import "./Results.css"; // Optional: Add custom styles for the results page

function Results({ students, subjects }) {
  const PASS_MARK = 40;

  const topStudent = students.length > 0 
    ? students.reduce((prev, current) => (prev.total > current.total) ? prev : current) 
    : null;

  if (students.length === 0) {
    return <div className="card"><h2 style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No records found. Please enter marks first.</h2></div>;
  }

  return (
    <div className="results-container">
      {topStudent && (
        <section className="top-scorer card highlight">
          <h2>🏆 Institute Leaderboard Top Performer</h2>
          <p><strong>{topStudent.name}</strong> is leading with a total of <strong>{topStudent.total}</strong> (Average: {topStudent.average}%, Overall Grade: {topStudent.grade}).</p>
        </section>
      )}

      <section className="results-section card">
        <h2>Final Results & Subject Analysis</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {subjects.map(sub => <th key={sub}>{sub}</th>)}
                <th>Total</th>
                <th>Avg</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                // Determine if student passed all subjects
                const hasFailedSubject = subjects.some(sub => student.marks[sub] < PASS_MARK);
                
                return (
                  <tr key={student.id}>
                    <td><strong>{student.name}</strong></td>
                    
                    {/* Render Subject Marks with Pass/Fail color logic */}
                    {subjects.map(sub => {
                      const mark = student.marks[sub];
                      const isPass = mark >= PASS_MARK;
                      return (
                        <td key={sub} style={{ color: isPass ? 'var(--text-main)' : 'var(--danger)' }}>
                          {mark} {isPass ? '(P)' : '(F)'}
                        </td>
                      );
                    })}
                    
                    <td><strong>{student.total}</strong></td>
                    <td>{student.average}%</td>
                    <td style={{ fontWeight: 'bold', color: hasFailedSubject ? 'var(--danger)' : 'var(--success)' }}>
                      {hasFailedSubject ? 'FAIL' : 'PASS'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Results;