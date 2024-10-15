import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { TaskContext } from "./Taskprovider";

export default function EditTask() {
  const { editTask } = useContext(TaskContext); 
  const location = useLocation();
  const navigate = useNavigate();

  const { task } = location.state || {};

  const [title, setTitle] = useState(task?.title || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [status, setStatus] = useState(task?.status || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");

  useEffect(() => {
    if (!task) {
      navigate("/dashboard"); 
    }
  }, [task, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedTask = {
      ...task,
      title,
      dueDate,
      status,
      priority,
    };

    editTask(updatedTask);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Due Date:
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
