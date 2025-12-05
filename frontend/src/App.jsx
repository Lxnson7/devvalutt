import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import GetStarted from './pages/GetStarted'


// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      

      {/* App Content with Routes */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Router>
          <Routes>
            {/* Get Started - Landing Page (default) */}
            <Route path="/" element={<GetStarted />} />
            
            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard - Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
