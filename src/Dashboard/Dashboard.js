import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../component/Taskprovider';

export default function Dashboard() {
  const { tasks, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteClick = (taskToDelete) => {
    deleteTask(taskToDelete);
  };

  const handleEditClick = (task) => {
    navigate("/edittask", { state: { task } });
  };

  const filteredTasks = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (task.title && task.title.toLowerCase().includes(searchLower)) ||
      (task.description && task.description.toLowerCase().includes(searchLower)) ||
      (task.priority && task.priority.toLowerCase().includes(searchLower)) ||
      (task.status && task.status.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <input
        type="text"
        placeholder="Search tasks by title, description, priority, or status..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task, index) => (
            <li key={index} className="border border-gray-300 rounded-md p-4">
              <h2 className="font-bold text-lg">Title: {task.title}</h2>
              <p className="text-gray-500">Due Date: {task.dueDate}</p>
              <p className="text-gray-500">Status: {task.status}</p>
              <p className="text-gray-500">Priority: {task.priority}</p>
              <button
                onClick={() => handleEditClick(task)}
                className="mt-2 bg-green-500 text-white font-normal py-1 px-2 mx-2 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(task)}
                className="mt-2 bg-red-500 text-white font-normal py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
