import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "./Taskprovider";

export default function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState(""); // No default selection
  const [success, setSuccess] = useState(false);

  const [taskError, setTaskError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [priorityError, setPriorityError] = useState(""); // For priority error

  const handleSubmit = (event) => {
    event.preventDefault();

    setTaskError("");
    setDueDateError("");
    setPriorityError(""); 

    let hasError = false;

    if (!title) {
      setTaskError("Task is required.");
      hasError = true;
    }
    if (!dueDate) {
      setDueDateError("Due date is required.");
      hasError = true;
    }
    if (!priority) { 
      setPriorityError("Priority is required.");
      hasError = true;
    }

    if (hasError) return;

    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      status,
      priority,
    };

    addTask(newTask);
    toast.success("Task created successfully!");

    setSuccess(true);
    setTitle("");
    setDueDate("");
    setStatus("");
    setPriority("");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Task
      </h1>
      {success && <p className="text-green-500">Task created successfully!</p>}
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
          />
          {taskError && <p className="text-red-500">{taskError}</p>}
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
          />
          {dueDateError && <p className="text-red-500">{dueDateError}</p>}
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
            <option value="">Select a Status</option>
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
            <option value="">Select a Priority</option> 
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {priorityError && <p className="text-red-500">{priorityError}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
