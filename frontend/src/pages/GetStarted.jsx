import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, ArrowRight, Key, Shield, Zap } from 'lucide-react'

export default function GetStarted() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    // Already on Get Started page, just refresh the state
    window.location.href = '/'
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Header */}
      <nav className="navbar" style={{ position: 'relative', zIndex: 10 }}>
        <div className="navbar-container">
          <div className="logo-section">
            <span className="logo-icon">🔐</span>
            <h1 className="logo-text">DevKey<span>Vault</span></h1>
          </div>
          <div className="user-section">
            {user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '800', 
            color: '#f9fafb',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Secure API Key Management
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#9ca3af',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Store, organize, and manage all your API keys in one secure place. 
            Built for developers who value security and simplicity.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            {user ? (
              <button 
                onClick={() => navigate('/dashboard')}
                style={{ 
                  padding: '16px 32px', 
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600'
                }}
              >
                Go to Dashboard
                <ArrowRight size={20} />
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  style={{ 
                    padding: '16px 32px', 
                    fontSize: '18px',
                    fontWeight: '600'
                  }}
                >
                  Get Started Free
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                  style={{ 
                    padding: '16px 32px', 
                    fontSize: '18px',
                    fontWeight: '600'
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Features */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginTop: '60px'
          }}>
            <div style={{ 
              padding: '32px',
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '12px'
            }}>
              <div style={{ 
                width: '48px',
                height: '48px',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Shield size={24} style={{ color: '#22d3ee' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#f9fafb', marginBottom: '8px' }}>
                Secure Storage
              </h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                Your API keys are encrypted and stored securely with row-level security
              </p>
            </div>

            <div style={{ 
              padding: '32px',
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '12px'
            }}>
              <div style={{ 
                width: '48px',
                height: '48px',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Key size={24} style={{ color: '#22d3ee' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#f9fafb', marginBottom: '8px' }}>
                Easy Management
              </h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                Organize keys by projects, copy with one click, and manage access easily
              </p>
            </div>

            <div style={{ 
              padding: '32px',
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '12px'
            }}>
              <div style={{ 
                width: '48px',
                height: '48px',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Zap size={24} style={{ color: '#22d3ee' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#f9fafb', marginBottom: '8px' }}>
                Lightning Fast
              </h3>
              <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                Built with modern tech stack for blazing fast performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
