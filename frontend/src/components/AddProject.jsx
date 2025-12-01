import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Plus, X } from 'lucide-react'

export default function AddProject({ onProjectAdded }) {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('projects')
        .insert([{ name, description, user_id: user.id }])
      
      if (error) throw error

      setName('')
      setDescription('')
      setShowModal(false)
      onProjectAdded()
    } catch (error) {
      alert('Error creating project: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setName('')
    setDescription('')
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        style={{ 
          padding: '12px 24px', 
          fontSize: '15px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Plus size={18} />
        Create New Project
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>
            
            <h2 className="modal-title">Create New Project</h2>
            <p className="modal-subtitle">Add a new project to organize your API keys.</p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#f9fafb' 
                }}>
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="My Awesome Project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px' }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#f9fafb' 
                }}>
                  Description
                </label>
                <textarea
                  placeholder="A brief description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  style={{ width: '100%', padding: '12px 14px', resize: 'vertical' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="btn-secondary"
                  style={{ padding: '10px 20px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  style={{ padding: '10px 20px' }}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
