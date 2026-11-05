import { Check, Pencil, Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? "is-complete" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        onClick={() => onToggle(task)}
        aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
      >
        {task.completed && <Check size={15} />}
      </button>
      <div className="task-copy">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <span className="task-status">{task.completed ? "Completed" : "In progress"}</span>
      </div>
      <div className="task-actions">
        <button className="icon-button" onClick={() => onEdit(task)} aria-label="Edit task">
          <Pencil size={16} />
        </button>
        <button className="icon-button danger" onClick={() => onDelete(task._id)} aria-label="Delete task">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
