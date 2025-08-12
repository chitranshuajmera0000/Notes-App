```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note'; // Assuming Note is your React component


describe('Note Component', () => {
  test('renders the note title and content', () => {
    render(<Note title="Test Note" content="This is a test note." />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  test('handles note deletion', async () => {
    const deleteNote = jest.fn();
    render(<Note title="Deletable Note" content="This note can be deleted" deleteNote={deleteNote} id="testId" />);
    userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(deleteNote).toHaveBeenCalledWith("testId");
  });


  test('updates note content on change', async () => {
    const updateNote = jest.fn();
    render(<Note title="Updatable Note" content="Initial content" updateNote={updateNote} id="testId" />);
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, ' updated content');
    expect(inputElement.value).toBe('Initial content updated content');
    //Simulate submit to call updateNote
    userEvent.keyboard('{Enter}')
    expect(updateNote).toHaveBeenCalledWith("testId", "Initial content updated content");
  });


  test('renders without crashing with empty props', () => {
    render(<Note />);
    expect(screen.getByText('No note selected')).toBeInTheDocument(); // Add a default message to check
  });
});

```
