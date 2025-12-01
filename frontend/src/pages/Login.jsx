import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import '../App.css'


export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

    const { user } = useAuth()

   useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn({ email, password })
        if (error) throw error
        // Navigation happens automatically via useEffect
      } else {
        const { error } = await signUp({ email, password })
        if (error) throw error
        alert('Check your email to confirm your account!')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#f9fafb', marginBottom: '8px' }}>
            DevKey<span style={{ color: '#22d3ee' }}>Vault</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            {isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#f9fafb' 
            }}>
              Email
            </label>
            <input
  type="email"
  placeholder="your.email@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{ width: '100%', padding: '12px 14px' }}
/>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#f9fafb' 
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px' }}
            />
          </div>
          
          {error && (
            <div style={{ 
              padding: '12px', 
              marginBottom: '16px', 
              background: '#7f1d1d', 
              color: '#fca5a5',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #991b1b'
            }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', marginBottom: '16px', fontSize: '15px' }}
          >
            {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="link-button"
            style={{ fontSize: '14px', marginLeft: '4px' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}
