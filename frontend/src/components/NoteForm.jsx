import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function NoteForm({ addNote, loading }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    addNote(title, content);
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Create New Note</h2>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-lg placeholder-gray-400"
            />
            
            <div className={`transition-all duration-300 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <textarea
                placeholder="Add some details..."
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32 transition-all duration-200 placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className={`transition-all duration-300 ${isExpanded ? 'mt-4 opacity-100' : 'mt-0 opacity-0 h-0 overflow-hidden'}`}>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading || !title.trim() || !content.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? 'Adding...' : 'Add Note'}
              </button>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setContent('');
                }}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}