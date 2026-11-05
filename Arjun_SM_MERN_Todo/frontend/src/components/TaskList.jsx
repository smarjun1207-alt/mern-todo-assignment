import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (visibleTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><ClipboardList size={26} /></div>
        <h3>{filter === "all" ? "No tasks yet" : "Nothing here"}</h3>
        <p>{filter === "all" ? "Add your first task above and get moving." : "Try another filter or add a new task."}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
