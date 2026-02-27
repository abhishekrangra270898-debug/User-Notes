import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Notes() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  /* Load notes */
  const loadNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  /* Add note */
  const addNote = async () => {
    if (!note.title || !note.content) {
      return alert("Title and content required");
    }

    await api.post("/notes", note);
    setNote({ title: "", content: "" });
    loadNotes();
  };

  /* Delete note */
  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    loadNotes();
  };

  /* Logout */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="notes-container">
      {/* Header */}
      <div className="notes-header">
  <h2>My Notes 📝</h2>
  <button className="logout-btn" onClick={logout}>
    Logout
  </button>
</div>



      {/* Add Note Form */}
      <div className="note-form">
        <input
          placeholder="Title"
          value={note.title}
          onChange={e =>
            setNote({ ...note, title: e.target.value })
          }
        />

        <textarea
          placeholder="Content"
          value={note.content}
          onChange={e =>
            setNote({ ...note, content: e.target.value })
          }
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      {/* Notes List */}
      <div className="notes-grid">
        {notes.length === 0 && <p>No notes yet</p>}

        {notes.map(n => (
          <div className="note-card" key={n._id}>
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <button onClick={() => deleteNote(n._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
