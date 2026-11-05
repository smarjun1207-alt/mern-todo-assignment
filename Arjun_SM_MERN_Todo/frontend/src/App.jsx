import { useEffect, useMemo, useState } from "react";
import { CheckCheck, ListTodo, LoaderCircle, Sparkles } from "lucide-react";
import { createTask, deleteTask, getTasks, updateTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length
  }), [tasks]);

  async function handleSave(values) {
    setError("");
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, values);
        setTasks((previous) => previous.map((task) => task._id === updated._id ? updated : task));
        setEditingTask(null);
      } else {
        const created = await createTask(values);
        setTasks((previous) => [created, ...previous]);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function handleToggle(task) {
    setError("");
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((previous) => previous.map((item) => item._id === updated._id ? updated : item));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteTask(id);
      setTasks((previous) => previous.filter((task) => task._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Taskflow home">
          <span className="brand-mark"><ListTodo size={21} /></span>
          <span>taskflow<span className="brand-dot">.</span></span>
        </a>
        <span className="topbar-note"><span className="live-dot" /> Your personal workspace</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={13} /> PLAN. FOCUS. FINISH.</span>
          <h1>Make space for<br /><span>what matters.</span></h1>
          <p>A calmer way to organize your day, one task at a time.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-circle circle-one" />
          <div className="art-circle circle-two" />
          <div className="art-card"><CheckCheck size={28} /><span>One thing<br />at a time.</span></div>
        </div>
      </section>

      <section className="dashboard">
        <div className="stats-grid">
          <div className="stat-card"><span>Total tasks</span><strong>{counts.all}</strong><small>Everything on your list</small></div>
          <div className="stat-card"><span>In progress</span><strong>{counts.active}</strong><small>Ready for your focus</small></div>
          <div className="stat-card"><span>Completed</span><strong>{counts.completed}</strong><small>Look at you go</small></div>
        </div>

        <div className="content-grid">
          <TaskForm
            onSubmit={handleSave}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
          <section className="tasks-panel">
            <div className="tasks-heading">
              <div><span className="eyebrow">YOUR WORKSPACE</span><h2>My tasks</h2></div>
              <span className="task-total">{counts.all} total</span>
            </div>
            <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
              {["all", "active", "completed"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "selected" : ""}
                  onClick={() => setFilter(item)}
                  role="tab"
                  aria-selected={filter === item}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                  <span>{counts[item]}</span>
                </button>
              ))}
            </div>
            {error && <div className="error-message" role="alert">{error}</div>}
            {loading ? (
              <div className="loading-state"><LoaderCircle className="spinner" size={22} /> Loading tasks...</div>
            ) : (
              <TaskList
                tasks={tasks}
                filter={filter}
                onToggle={handleToggle}
                onEdit={setEditingTask}
                onDelete={handleDelete}
              />
            )}
          </section>
        </div>
      </section>
      <footer>Built with care using MongoDB, Express, React & Node.js <span>✦</span></footer>
    </main>
  );
}
