import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Eye, EyeOff, Copy, Trash2 } from 'lucide-react'

export default function ApiKeyList({ projectId, refreshTrigger }) {
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleKeys, setVisibleKeys] = useState({})

  useEffect(() => {
    fetchApiKeys()
  }, [projectId, refreshTrigger])

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setApiKeys(data || [])
    } catch (error) {
      console.error('Error fetching API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key)
    alert('API key copied to clipboard!')
  }

  const toggleVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const deleteKey = async (keyId, keyName) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${keyName}"?\n\nThis action cannot be undone.`)
    
    if (!confirmed) return
    
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', keyId)
      
      if (error) throw error
      fetchApiKeys()
    } catch (error) {
      alert('Error deleting key: ' + error.message)
    }
  }

  const maskKey = (key) => {
    if (key.length <= 12) return key
    return key.substring(0, 8) + '••••••••••••••••' + key.substring(key.length - 4)
  }

  if (loading) return <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '16px' }}>Loading keys...</p>

  if (apiKeys.length === 0) {
    return (
      <p style={{ 
        color: '#6b7280', 
        fontSize: '14px', 
        marginTop: '16px',
        textAlign: 'center',
        padding: '20px'
      }}>
        No API keys yet. Click "Add Key" to create one.
      </p>
    )
  }

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {apiKeys.map(key => (
        <div 
          key={key.id} 
          style={{ 
            background: '#0a0a0a',
            border: '1px solid #1f2937', 
            padding: '16px', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#f9fafb',
              marginBottom: '6px'
            }}>
              {key.key_name}
            </div>
            <div style={{ 
              fontFamily: 'Monaco, Consolas, monospace', 
              fontSize: '12px', 
              color: '#9ca3af',
              wordBreak: 'break-all'
            }}>
              {visibleKeys[key.id] ? key.api_key : maskKey(key.api_key)}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '6px',
            flexShrink: 0
          }}>
            <button 
              onClick={() => toggleVisibility(key.id)}
              style={{ 
                padding: '8px',
                background: 'transparent',
                border: '1px solid #374151',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4b5563'
                e.currentTarget.style.color = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.color = '#9ca3af'
              }}
              title={visibleKeys[key.id] ? 'Hide key' : 'Show key'}
            >
              {visibleKeys[key.id] ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button 
              onClick={() => copyToClipboard(key.api_key)}
              style={{ 
                padding: '8px',
                background: 'transparent',
                border: '1px solid #374151',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4b5563'
                e.currentTarget.style.color = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.color = '#9ca3af'
              }}
              title="Copy to clipboard"
            >
              <Copy size={16} />
            </button>
            <button 
              onClick={() => deleteKey(key.id, key.key_name)}
              style={{ 
                padding: '8px',
                background: 'transparent',
                border: '1px solid #991b1b',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: '#ef4444'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7f1d1d'
                e.currentTarget.style.color = '#fca5a5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ef4444'
              }}
              title="Delete key"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
