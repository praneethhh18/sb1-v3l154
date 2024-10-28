import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database('student_management.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    headOfDepartment TEXT,
    totalStudents INTEGER
  );

  CREATE TABLE IF NOT EXISTS timetables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch TEXT NOT NULL,
    semester INTEGER NOT NULL,
    day TEXT NOT NULL,
    timeSlot TEXT NOT NULL,
    subject TEXT,
    teacher TEXT,
    room TEXT
  );
`);

// Initialize sample data
const initializeSampleData = db.transaction(() => {
  const branches = [
    { name: 'Computer Science Engineering', code: 'CSE', description: 'Focus on computer systems and software', headOfDepartment: 'Dr. Sarah Johnson', totalStudents: 320 },
    { name: 'Electronics Engineering', code: 'ECE', description: 'Study of electronic systems', headOfDepartment: 'Dr. Michael Chen', totalStudents: 280 },
    { name: 'Mechanical Engineering', code: 'ME', description: 'Study of mechanical systems', headOfDepartment: 'Dr. Robert Wilson', totalStudents: 300 },
    { name: 'Civil Engineering', code: 'CE', description: 'Focus on infrastructure and construction', headOfDepartment: 'Dr. Emily Brown', totalStudents: 250 },
    { name: 'Chemical Engineering', code: 'CHE', description: 'Study of chemical processes', headOfDepartment: 'Dr. David Miller', totalStudents: 200 },
    { name: 'Electrical Engineering', code: 'EE', description: 'Study of electrical systems', headOfDepartment: 'Dr. Lisa Anderson', totalStudents: 270 },
    { name: 'Aerospace Engineering', code: 'AE', description: 'Focus on aircraft and spacecraft', headOfDepartment: 'Dr. James Wright', totalStudents: 180 },
    { name: 'Biotechnology', code: 'BT', description: 'Study of biological processes', headOfDepartment: 'Dr. Maria Garcia', totalStudents: 220 },
    { name: 'Information Technology', code: 'IT', description: 'Focus on information systems', headOfDepartment: 'Dr. John Davis', totalStudents: 310 },
    { name: 'Artificial Intelligence', code: 'AI', description: 'Study of intelligent systems', headOfDepartment: 'Dr. Alice Thompson', totalStudents: 240 }
  ];

  const insert = db.prepare(`
    INSERT OR REPLACE INTO branches (name, code, description, headOfDepartment, totalStudents)
    VALUES (@name, @code, @description, @headOfDepartment, @totalStudents)
  `);

  for (const branch of branches) {
    insert.run(branch);
  }
});

// Run initialization
initializeSampleData();

// Routes
app.get('/api/branches', (req, res) => {
  try {
    const branches = db.prepare('SELECT * FROM branches').all();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/timetable/:branch/:semester', (req, res) => {
  try {
    const timetable = db.prepare(`
      SELECT * FROM timetables 
      WHERE branch = ? AND semester = ?
      ORDER BY day, timeSlot
    `).all(req.params.branch, req.params.semester);
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});