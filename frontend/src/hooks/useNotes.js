import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useNotes(user) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }
    setLoading(true);
    axios.get('http://localhost:3000/api/notes', { withCredentials: true })
      .then(res => setNotes(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [user]);

  const addNote = async (title, content) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/notes', { title, content }, { withCredentials: true });
      setNotes(prev => [...prev, res.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, { withCredentials: true });
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  // Add this function to your existing useNotes hook

  const updateNote = async (id, title, content) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/notes/${id}`, {
        title,
        content
      }, { withCredentials: true });

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? { ...note, title, content, updatedAt: new Date() } : note
        )
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // Make sure to return updateNote from your hook
  return { notes, loading, error, addNote, deleteNote, updateNote };


}
