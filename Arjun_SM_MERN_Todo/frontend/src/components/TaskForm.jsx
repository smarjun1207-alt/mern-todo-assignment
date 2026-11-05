import { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(editingTask?.title || "");
    setDescription(editingTask?.description || "");
  }, [editingTask]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    const saved = await onSubmit({ title: title.trim(), description: description.trim() });
    if (saved) {
      setTitle("");
      setDescription("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{editingTask ? "UPDATE TASK" : "NEW TASK"}</span>
          <h2>{editingTask ? "Edit your task" : "What needs to get done?"}</h2>
        </div>
        {editingTask && (
          <button type="button" className="icon-button" onClick={onCancel} aria-label="Cancel editing">
            <X size={18} />
          </button>
        )}
      </div>
      <label htmlFor="task-title">Task title</label>
      <input
        id="task-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Finish Web Technology assignment"
        maxLength={120}
        required
      />
      <label htmlFor="task-description">Description <span>(optional)</span></label>
      <textarea
        id="task-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add a few details..."
        rows={2}
        maxLength={500}
      />
      <button className="primary-button" type="submit">
        {editingTask ? <Save size={17} /> : <Plus size={18} />}
        {editingTask ? "Save changes" : "Add task"}
      </button>
    </form>
  );
}
