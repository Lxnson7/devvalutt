import { supabase } from '../supabaseClient'
import { Trash2 } from 'lucide-react'

export default function ProjectActions({ project, onProjectDeleted }) {
  const deleteProject = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?\n\nThis will permanently delete ALL API keys in this project.\n\nThis action cannot be undone.`
    )
    
    if (!confirmed) return
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)
      
      if (error) throw error
      onProjectDeleted()
    } catch (error) {
      alert('Error deleting project: ' + error.message)
    }
  }

  return (
    <button 
      onClick={deleteProject}
      className="btn-delete"
      style={{ 
        padding: '8px 16px', 
        fontSize: '13px', 
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      title="Delete this project"
    >
      <Trash2 size={16} />
      Delete
    </button>
  )
}
