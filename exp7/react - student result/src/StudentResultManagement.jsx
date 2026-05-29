
import "./StudentResultManagement.css";

const students = [
  {
    rollNo: "CS101",
    name: "Aarav Sharma",
    course: "B.Sc. Computer Science",
    semester: "Sem 4",
    attendance: "92%",
    marks: [
      { subject: "Data Structures", score: 86 },
      { subject: "DBMS", score: 79 },
      { subject: "Web Technology", score: 91 },
      { subject: "Operating Systems", score: 84 },
    ],
  },
  {
    rollNo: "CS102",
    name: "Neha Verma",
    course: "B.Sc. Computer Science",
    semester: "Sem 4",
    attendance: "95%",
    marks: [
      { subject: "Data Structures", score: 93 },
      { subject: "DBMS", score: 88 },
      { subject: "Web Technology", score: 90 },
      { subject: "Operating Systems", score: 85 },
    ],
  },
  {
    rollNo: "CS103",
    name: "Rohan Patel",
    course: "B.Sc. Computer Science",
    semester: "Sem 4",
    attendance: "89%",
    marks: [
      { subject: "Data Structures", score: 71 },
      { subject: "DBMS", score: 76 },
      { subject: "Web Technology", score: 69 },
      { subject: "Operating Systems", score: 74 },
    ],
  },
];

function getTotal(marks) {
  return marks.reduce((sum, item) => sum + item.score, 0);
}

function getPercentage(marks) {
  return (getTotal(marks) / (marks.length * 100)) * 100;
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  return "D";
}

export default function StudentResultManagement() {
  const overallAverage = students.reduce((sum, student) => sum + getPercentage(student.marks), 0) / students.length;
  const highestPercentage = Math.max(...students.map((student) => getPercentage(student.marks)));

  return (
    <div className="result-page">
      <div className="result-wrap">
        <header className="page-head">
          <p className="small-note">Experiment 7a</p>
          <h1>Student Result Management System</h1>
          <p className="intro">
            This page shows a basic result sheet with student details, marks, total,
            percentage, and grade. It is kept plain so it looks like a normal college practical.
          </p>
        </header>

        <section className="summary-grid">
          <div className="summary-box">
            <p>Total Students</p>
            <strong>{students.length}</strong>
          </div>
          <div className="summary-box">
            <p>Class Average</p>
            <strong>{overallAverage.toFixed(1)}%</strong>
          </div>
          <div className="summary-box">
            <p>Top Percentage</p>
            <strong>{highestPercentage.toFixed(1)}%</strong>
          </div>
        </section>

        <div className="student-list">
          {students.map((student) => {
            const total = getTotal(student.marks);
            const percentage = getPercentage(student.marks);
            const grade = getGrade(percentage);
            const resultStatus = percentage >= 60 ? "Pass" : "Fail";

            return (
              <article key={student.rollNo} className="student-card">
                <div className="card-head">
                  <div>
                    <h2>{student.name}</h2>
                    <p className="roll-no">Roll No: {student.rollNo}</p>
                  </div>
                  <span className={resultStatus === "Pass" ? "status pass" : "status fail"}>
                    {resultStatus}
                  </span>
                </div>

                <div className="student-info">
                  <span>Course: {student.course}</span>
                  <span>Semester: {student.semester}</span>
                  <span>Attendance: {student.attendance}</span>
                </div>

                <table className="marks-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th className="right">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.marks.map((item) => (
                      <tr key={item.subject}>
                        <td>{item.subject}</td>
                        <td className="right strong">{item.score}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="strong">Total</td>
                      <td className="right strong">{total}</td>
                    </tr>
                    <tr>
                      <td className="strong">Percentage</td>
                      <td className="right strong">{percentage.toFixed(2)}%</td>
                    </tr>
                    <tr>
                      <td className="strong">Grade</td>
                      <td className="right strong">{grade}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="remark">
                  Teacher remark: {resultStatus === "Pass" ? "Satisfactory performance." : "Needs improvement."}
                </p>
              </article>
            );
          })}
        </div>

        <footer className="page-foot">
          <p>Prepared for practical examination.</p>
        </footer>
      </div>
    </div>
  );
}
