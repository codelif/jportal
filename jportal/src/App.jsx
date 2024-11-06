import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Attendance from './components/Attendance'
import Grades from './components/Grades'
import Exams from './components/Exams'
import Subjects from './components/Subjects'
import Profile from './components/Profile'
import './App.css'

import { WebPortal, LoginError } from "https://cdn.jsdelivr.net/npm/jsjiit@0.0.13/dist/jsjiit.esm.js";


// Create WebPortal instance at the top level
const w = new WebPortal();

// Create a wrapper component to use the useNavigate hook
function AuthenticatedApp({ w, setIsAuthenticated }) {
  const [attendanceData, setAttendanceData] = useState({});
  const [attendanceSemestersData, setAttendanceSemestersData] = useState(null);

  const [subjectData, setSubjectData] = useState({});
  const [subjectSemestersData, setSubjectSemestersData] = useState(null);

  const [gradesData, setGradesData] = useState({});
  const [gradesSemesterData, setGradesSemesterData] = useState(null);

  const [selectedAttendanceSem, setSelectedAttendanceSem] = useState(null);
  const [selectedGradesSem, setSelectedGradesSem] = useState(null);
  const [selectedSubjectsSem, setSelectedSubjectsSem] = useState(null);

  // Add attendance goal state
  const [attendanceGoal, setAttendanceGoal] = useState(() => {
    const savedGoal = localStorage.getItem('attendanceGoal');
    return savedGoal ? parseInt(savedGoal) : 75; // Default to 75% if not set
  });

  // Add effect to save goal to localStorage when it changes
  useEffect
  (() => {
    localStorage.setItem('attendanceGoal', attendanceGoal.toString());
  }, [attendanceGoal]);

  // Add new profile data state
  const [profileData, setProfileData] = useState(null);

  // Add new state for grades component
  const [activeGradesTab, setActiveGradesTab] = useState("overview");
  const [gradeCardSemesters, setGradeCardSemesters] = useState([]);
  const [selectedGradeCardSem, setSelectedGradeCardSem] = useState(null);
  const [gradeCard, setGradeCard] = useState(null);

  // Add new state for storing grade cards
  const [gradeCards, setGradeCards] = useState({});

  // Add new states for subject attendance
  const [subjectAttendanceData, setSubjectAttendanceData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="min-h-screen pb-14 select-none">
      <Header setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/attendance" />} />
        <Route path="/login" element={<Navigate to="/attendance" />} />
        <Route
          path="/attendance"
          element={
            <Attendance
              w={w}
              attendanceData={attendanceData}
              setAttendanceData={setAttendanceData}
              semestersData={attendanceSemestersData}
              setSemestersData={setAttendanceSemestersData}
              selectedSem={selectedAttendanceSem}
              setSelectedSem={setSelectedAttendanceSem}
              attendanceGoal={attendanceGoal}
              setAttendanceGoal={setAttendanceGoal}
              subjectAttendanceData={subjectAttendanceData}
              setSubjectAttendanceData={setSubjectAttendanceData}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
          }
        />
        <Route
          path="/grades"
          element={
            <Grades
              w={w}
              gradesData={gradesData}
              setGradesData={setGradesData}
              semesterData={gradesSemesterData}
              setSemesterData={setGradesSemesterData}
              activeTab={activeGradesTab}
              setActiveTab={setActiveGradesTab}
              gradeCardSemesters={gradeCardSemesters}
              setGradeCardSemesters={setGradeCardSemesters}
              selectedGradeCardSem={selectedGradeCardSem}
              setSelectedGradeCardSem={setSelectedGradeCardSem}
              gradeCard={gradeCard}
              setGradeCard={setGradeCard}
              gradeCards={gradeCards}
              setGradeCards={setGradeCards}
            />
          }
        />
        <Route path="/exams" element={<Exams w={w} />} />
        <Route
          path="/subjects"
          element={
            <Subjects
              w={w}
              subjectData={subjectData}
              setSubjectData={setSubjectData}
              semestersData={subjectSemestersData}
              setSemestersData={setSubjectSemestersData}
              selectedSem={selectedSubjectsSem}
              setSelectedSem={setSelectedSubjectsSem}
            />
          }
        />
        <Route path="/profile" element={
          <Profile
            w={w}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        } />
      </Routes>
      <Navbar />
    </div>
  );
}

function LoginWrapper({ onLoginSuccess, w }) {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLoginSuccess();
    // Add a small delay to ensure state updates before navigation
    setTimeout(() => {
      navigate('/attendance');
    }, 100);
  };

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      w={w}
    />
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const performLogin = async () => {
      try {
        if (username && password) {
          await w.student_login(username, password);
          if (w.session) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        if (error instanceof LoginError) {
          setError("JIIT Web Portal server is temporarily unavailable. Please try again later.");
        } else {
          console.error("Auto-login failed:", error);
          setError("Auto-login failed. Please login again.");
        }
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    performLogin();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#191c20] text-white">
      Loading...
    </div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#191c20] select-none">
        {!isAuthenticated || !w.session ? (
          <Routes>
            <Route path="*" element={
              <>
                {error && <div className="text-red-500 text-center pt-4">{error}</div>}
                <LoginWrapper
                  onLoginSuccess={() => setIsAuthenticated(true)}
                  w={w}
                />
              </>
            } />
          </Routes>
        ) : (
          <AuthenticatedApp w={w} setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </Router>
  );
}

export default App