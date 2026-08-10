import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. Task List State - initialized from localStorage if available
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todos_app');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, title: "Complete Frontend Web Application", description: "Design responsive UI components and integrate routing", priority: "High", dueDate: "2026-08-15", completed: false },
      { id: 2, title: "Review Database Schema", description: "Study SQL triggers and join operations for optimization", priority: "Medium", dueDate: "2026-08-18", completed: true },
      { id: 3, title: "Purchase Reference Textbooks", description: "Pick up the recommended technical books from the bookstore", priority: "Low", dueDate: "2026-08-12", completed: false }
    ];
  });

  // 2. Form States (Combined for simplicity)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  // 3. Edit Mode Tracker
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // 4. Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // 5. Sorting States
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'creation'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Sync tasks to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('todos_app', JSON.stringify(tasks));
  }, [tasks]);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Add / Save Task Handler
  const handleSubmitTask = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Task Title is required!");
      return;
    }

    if (isEditing) {
      // Save edits
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === editTaskId 
            ? { ...task, title: form.title, description: form.description, priority: form.priority, dueDate: form.dueDate } 
            : task
        )
      );
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        priority: form.priority,
        dueDate: form.dueDate || new Date().toISOString().split('T')[0], // default today
        completed: false
      };
      setTasks(prevTasks => [newTask, ...prevTasks]);
    }

    // Reset Form
    setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
  };

  // Delete Task Handler
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      // If we were editing the deleted task, exit edit mode
      if (editTaskId === id) {
        setIsEditing(false);
        setEditTaskId(null);
        setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
      }
    }
  };

  // Toggle Completion Handler
  const handleToggleComplete = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Start Edit Mode Handler
  const handleStartEdit = (task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTaskId(null);
    setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
  };

  // Clear All Completed Tasks
  const handleClearCompleted = () => {
    if (window.confirm("Delete all completed tasks?")) {
      setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    }
  };

  // Calculate Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter and Sort Logic
  const getPriorityWeight = (priority) => {
    switch (priority) {
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  };

  const processedTasks = tasks
    .filter(task => {
      // 1. Search Query
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            task.description.toLowerCase().includes(searchQuery.toLowerCase());
      // 2. Status Filter
      const matchesStatus = statusFilter === 'All' ||
                            (statusFilter === 'Completed' && task.completed) ||
                            (statusFilter === 'Pending' && !task.completed);
      // 3. Priority Filter
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      // Sorting
      let comparison = 0;
      if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      } else if (sortBy === 'priority') {
        comparison = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
      } else {
        // default creation order (by task.id)
        comparison = a.id - b.id;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Priority Badge Color Selector
  const getPriorityBadgeClass = (priority) => {
    return 'bg-secondary';
  };

  return (
    <div className="pb-5">
      {/* Top Header Navbar */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-check2-square text-primary fs-3"></i>
            <span>Task Planner</span>
          </span>
        </div>
      </header>

      <main className="container">
        
        {/* Statistics Dashboard Section */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 text-center h-100">
              <span className="text-muted small fw-semibold d-block mb-1">Total Tasks</span>
              <span className="display-6 fw-bold text-dark">{totalTasks}</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 text-center h-100">
              <span className="text-muted small fw-semibold d-block mb-1">Pending</span>
              <span className="display-6 fw-bold text-dark">{pendingTasks}</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 text-center h-100">
              <span className="text-muted small fw-semibold d-block mb-1">Completed</span>
              <span className="display-6 fw-bold text-dark">{completedTasks}</span>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 h-100 d-flex flex-column justify-content-center">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted small fw-semibold">Task Progress</span>
                <span className="text-dark small fw-bold">{completionPercentage}%</span>
              </div>
              <div className="progress bg-light">
                <div 
                  className="progress-bar bg-primary rounded-pill" 
                  role="progressbar" 
                  style={{ width: `${completionPercentage}%` }} 
                  aria-valuenow={completionPercentage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          
          {/* Left Side: Add / Edit Task Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '90px', zIndex: 10 }}>
              <h5 className="fw-bold mb-3 text-dark">
                {isEditing ? (
                  <span><i className="bi bi-pencil-square text-warning me-2"></i>Edit Task Details</span>
                ) : (
                  <span><i className="bi bi-plus-circle-fill text-primary me-2"></i>Create New Task</span>
                )}
              </h5>
              
              <form onSubmit={handleSubmitTask}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Task Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    className="form-control rounded-3"
                    placeholder="Enter task title..."
                    value={form.title}
                    onChange={handleInputChange}
                    maxLength="50"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Description</label>
                  <textarea 
                    name="description"
                    className="form-control rounded-3"
                    rows="3"
                    placeholder="Add extra context (optional)..."
                    value={form.description}
                    onChange={handleInputChange}
                    maxLength="200"
                  ></textarea>
                </div>

                {/* Priority and Due Date */}
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">Priority</label>
                    <select 
                      name="priority"
                      className="form-select rounded-3"
                      value={form.priority}
                      onChange={handleInputChange}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">Due Date</label>
                    <input 
                      type="date" 
                      name="dueDate"
                      className="form-control rounded-3"
                      value={form.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className={`btn w-100 rounded-pill py-2 fw-semibold ${isEditing ? 'btn-warning text-dark' : 'btn-primary'}`}>
                    {isEditing ? 'Save Changes' : 'Add Task'}
                  </button>
                  {isEditing && (
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-3" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Side: Task Listing and Filters */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              
              {/* Search and Filters Bar */}
              <div className="row g-2 mb-3">
                <div className="col-md-5">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white text-muted border-end-0"><i className="bi bi-search"></i></span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 shadow-none ps-0"
                      placeholder="Search tasks by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-3 col-6">
                  <select 
                    className="form-select form-select-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="col-md-4 col-6">
                  <select 
                    className="form-select form-select-sm"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Sorting Options Row */}
              <div className="d-flex flex-wrap justify-content-between align-items-center bg-light p-2 rounded-3 mb-4 small gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary fw-semibold">Sort By:</span>
                  <button 
                    className={`btn btn-xs rounded-2 py-0.5 px-2 border-0 ${sortBy === 'dueDate' ? 'bg-dark text-white' : 'btn-light text-secondary'}`}
                    onClick={() => { setSortBy('dueDate'); setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'); }}
                  >
                    Due Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                  <button 
                    className={`btn btn-xs rounded-2 py-0.5 px-2 border-0 ${sortBy === 'priority' ? 'bg-dark text-white' : 'btn-light text-secondary'}`}
                    onClick={() => { setSortBy('priority'); setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc'); }}
                  >
                    Priority {sortBy === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </div>

                {completedTasks > 0 && (
                  <button className="btn btn-sm btn-link text-danger text-decoration-none p-0" onClick={handleClearCompleted}>
                    <i className="bi bi-trash-fill me-1"></i> Clear Completed ({completedTasks})
                  </button>
                )}
              </div>

              {/* Tasks List */}
              {processedTasks.length === 0 ? (
                <div className="text-center py-5">
                  <div className="d-inline-flex p-3 bg-secondary bg-opacity-10 text-secondary rounded-circle mb-3">
                    <i className="bi bi-clipboard2-x fs-2"></i>
                  </div>
                  <h5 className="fw-bold text-dark">No Tasks Found</h5>
                  <p className="text-secondary small mb-0">Either you have complete freedom or no items fit this specific filter setting.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {processedTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`todo-item card border shadow-sm bg-white p-3 ${task.completed ? 'completed' : ''}`}
                    >
                      <div className="d-flex align-items-start gap-3">
                        {/* Completion Checkbox */}
                        <div className="pt-1">
                          <input 
                            type="checkbox" 
                            className="form-check-input fs-5 border-secondary-subtle"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task.id)}
                            title="Toggle Completion"
                          />
                        </div>

                        {/* Task Content */}
                        <div className="flex-grow-1">
                          <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                            <h6 className={`fw-bold m-0 ${task.completed ? 'text-line-through' : 'text-dark'}`}>{task.title}</h6>
                            <span className={`badge badge-priority ${getPriorityBadgeClass(task.priority)}`}>
                              {task.priority} Priority
                            </span>
                            {task.dueDate && (
                              <span className="badge bg-secondary-subtle text-secondary small">
                                <i className="bi bi-calendar3 me-1"></i> {task.dueDate}
                              </span>
                            )}
                          </div>
                          {task.description && (
                            <p className={`small mb-0 text-break ${task.completed ? 'text-line-through text-muted' : 'text-secondary'}`}>
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-1 ms-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary border-0"
                            onClick={() => handleStartEdit(task)}
                            disabled={task.completed}
                            title="Edit task"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger border-0"
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete task"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
