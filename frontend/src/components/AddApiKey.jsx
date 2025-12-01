import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { generateApiKey } from '../utils/generateApiKey'

export default function AddApiKey({ projectId, onKeyAdded }) {
  const [showModal, setShowModal] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerateRandom = () => {
    const randomKey = generateApiKey()
    setApiKey(randomKey)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('api_keys')
        .insert([{
          project_id: projectId,
          key_name: keyName,
          api_key: apiKey,
          environment: 'Dev',
          role: 'Owner',
          status: 'Active'
        }])
      
      if (error) throw error

      setKeyName('')
      setApiKey('')
      setShowModal(false)
      onKeyAdded()
    } catch (error) {
      alert('Error adding API key: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setKeyName('')
    setApiKey('')
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        style={{ padding: '10px 18px', fontSize: '14px', marginTop: '16px' }}
      >
        + Add Key
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <h2 className="modal-title">Add API Key</h2>
            <p className="modal-subtitle">Add a new API key to this project.</p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#f9fafb' 
                }}>
                  Key Name
                </label>
                <input
                  type="text"
                  placeholder="Production API Key"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px' }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#f9fafb' 
                  }}>
                    API Key
                  </label>
                  <button 
                    type="button"
                    onClick={handleGenerateRandom}
                    className="link-button"
                  >
                    Generate Random
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="sk_live_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 14px',
                    fontFamily: 'Monaco, Consolas, monospace',
                    fontSize: '13px'
                  }}
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
                  {loading ? 'Adding...' : 'Add Key'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
