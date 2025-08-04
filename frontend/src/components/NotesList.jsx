import { useState } from 'react';
import { Search, Filter, Plus, Grid, List } from 'lucide-react';
import NoteItem from './NoteItem';

export default function NotesList({ notes, onDelete, onUpdate, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading notes...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
        
        <div className="flex gap-3">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-colors duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white min-w-[140px]"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* Notes Display */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first note to get started'}
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr" 
            : "space-y-4"
        }>
          {filteredNotes.map(note => (
            <NoteItem 
              key={note._id} 
              note={note} 
              onDelete={onDelete} 
              onUpdate={onUpdate}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}