import { useState } from 'react';
import { Trash2, Edit3, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function NoteItem({ note, onDelete, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [isUpdating, setIsUpdating] = useState(false);

  // Text truncation limits
  const TITLE_LIMIT = 50;
  const CONTENT_PREVIEW_LIMIT = 90;
  const CONTENT_LINES_LIMIT = 3;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(note._id);
    }, 200);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    
    setIsUpdating(true);
    try {
      await onUpdate(note._id, editTitle.trim(), editContent.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  // Text truncation helpers
  const truncateTitle = (title) => {
    if (title.length <= TITLE_LIMIT) return title;
    return title.substring(0, TITLE_LIMIT) + '...';
  };

  const truncateContent = (content) => {
    if (content.length <= CONTENT_PREVIEW_LIMIT) return content;
    return content.substring(0, CONTENT_PREVIEW_LIMIT) + '...';
  };

  const shouldShowExpandButton = note.content.length > CONTENT_PREVIEW_LIMIT;

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 transition-all duration-300">
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-semibold text-lg"
              placeholder="Note title..."
            />
            <p className="text-xs text-gray-400 mt-1">
              {editTitle.length}/{TITLE_LIMIT * 2} characters
            </p>
          </div>
          
          <div>
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32"
              placeholder="Note content..."
            />
            <p className="text-xs text-gray-400 mt-1">
              {editContent.length} characters
            </p>
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleUpdate}
              disabled={isUpdating || !editTitle.trim() || !editContent.trim()}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
            >
              <Save className="w-3 h-3" />
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1 ${isDeleting ? 'opacity-50 scale-95' : ''} ${isExpanded ? 'row-span-2' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 
          className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 leading-tight"
          title={note.title} // Show full title on hover
        >
          {truncateTitle(note.title)}
        </h3>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit note"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className={`text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
          {isExpanded ? note.content : truncateContent(note.content)}
        </p>
        
        {shouldShowExpandButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Read more
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{formatDate(note.createdAt || note.updatedAt)}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs">
            {note.content.length} chars
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
}