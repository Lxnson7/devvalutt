import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { ChevronRight, ChevronDown, Folder, LogOut } from 'lucide-react'
import AddProject from '../components/AddProject'
import ApiKeyList from '../components/ApiKeyList'
import AddApiKey from '../components/AddApiKey'
import ProjectActions from '../components/ProjectActions'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()  
  
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshKeys, setRefreshKeys] = useState({})
  const [expandedProjects, setExpandedProjects] = useState({})

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleHome = async () => {
    navigate('/', { replace: true })
  }

  const triggerKeyRefresh = (projectId) => {
    setRefreshKeys(prev => ({ ...prev, [projectId]: Date.now() }))
  }

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" style={{ position: 'relative', zIndex: 10 }}>
        <div className="navbar-container">
          <div className="logo-section">
            <span className="logo-icon">🔐</span>
            <h1 className="logo-text">DevKey<span>Vault</span></h1>
          </div>
          <div className="user-section">
            <span className="user-email">{user?.email}</span>
            <button onClick={handleHome} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} />
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content" style={{ position: 'relative', zIndex: 10 }}>
        <div className="page-header">
          <h2 className="page-title">Projects</h2>
          <p className="page-subtitle">Manage your API keys organized by projects</p>
        </div>

        <AddProject onProjectAdded={fetchProjects} />

        {loading ? (
          <div className="empty-state">
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        ) : (
          <div>
            {projects.map(project => {
              const isExpanded = expandedProjects[project.id]
              
              return (
                <div key={project.id} className="project-card">
                  <div className="project-header" onClick={() => toggleProject(project.id)}>
                    <div className="project-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {isExpanded ? (
                          <ChevronDown size={20} style={{ color: '#9ca3af', flexShrink: 0 }} />
                        ) : (
                          <ChevronRight size={20} style={{ color: '#9ca3af', flexShrink: 0 }} />
                        )}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: '40px',
                          height: '40px',
                          background: 'rgba(34, 211, 238, 0.1)',
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          borderRadius: '8px',
                          flexShrink: 0
                        }}>
                          <Folder size={20} style={{ color: '#22d3ee' }} />
                        </div>
                      </div>
                      <div className="project-details">
                        <h3>{project.name}</h3>
                        <p>{project.description || 'No description'}</p>
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <ProjectActions project={project} onProjectDeleted={fetchProjects} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="api-keys-section">
                      <h4 className="section-title">API Keys</h4>
                      <ApiKeyList projectId={project.id} refreshTrigger={refreshKeys[project.id]} />
                      <AddApiKey projectId={project.id} onKeyAdded={() => triggerKeyRefresh(project.id)} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
