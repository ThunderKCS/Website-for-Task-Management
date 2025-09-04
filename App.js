import React, { useState, useEffect } from 'react';
import './index.css';


function App() {
  
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  const API_URL = 'http://localhost:3000/tasks'; 
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });


    console.log('Response status:', res.status);
    const newTask = await res.json();
    console.log('Response JSON:', newTask);

    if (!res.ok) throw new Error('Failed to add task');

    setTasks([...tasks, newTask]);
    setForm({ title: '', description: '', status: 'pending', dueDate: '' });
  } catch (err) {
    console.error('Error adding task:', err);
  }
};

;

  return (
    <div className="min-h-screen p-6 bg-gray-800">
     <div className="max-w-4xl mx-auto bg-blue-200 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-600 mb-6">Task Manager</h1>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              id="title"
              placeholder="Task Title"
              value={form.title}
              onChange={handleChange}
              required
              className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-950  transition duration-300"
            />
            <input
              type="text"
              id="description"
              placeholder="Description (Optional)"
              value={form.description}
              onChange={handleChange}
              className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-950 transition duration-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              id="status"
              value={form.status}
              onChange={handleChange}
              className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-950  transition duration-300"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              id="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-950  transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-200 text-slate-950 p-3 rounded-md font-semibold hover:bg-green-500 transition duration-300"
          >
            Add Task
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Tasks</h2>
          <ul className="space-y-4">
            {tasks.length === 0 && (
              <li className="text-center text-gray-500">No tasks found. Add a new one above!</li>
            )}
            {tasks.map((task, idx) => (
              <li
                key={idx}
                className={`bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 ${
                  task.status === 'completed'
                    ? 'border-green-500'
                    : task.status === 'in-progress'
                    ? 'border-yellow-500'
                    : 'border-gray-500'
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description || 'No description'}</p>
                  <span className="text-xs font-medium text-gray-400 mt-1 block">
                    Due: {task.dueDate || 'No due date'}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full text-white mt-2 inline-block capitalize ${
                      task.status === 'completed'
                        ? 'bg-green-500'
                        : task.status === 'in-progress'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
