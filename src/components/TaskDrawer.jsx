import { useState, useEffect } from "react";

const availableLabels = ["Frontend", "Backend", "Bug", "Feature", "Urgent"];
const defaultTask = {
  id: "",
  title: "",
  description: "",
  status: "To Do",
  dueDate: "",
  priority: "Medium",
  labels: [],
  assignedTo: "",
};
const TaskDrawer = ({
  isOpen,
  onClose,
  onSave,
  task = {},
  users,
  mode = "add",
}) => {
  const [formData, setFormData] = useState(defaultTask);
  useEffect(() => {
    if (mode === "edit" && task) {
      setFormData(task);
    } else {
      setFormData({
        id: Date.now(),
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        labels: [],
        assignedTo: "",
        status: "To Do",
      });
    }
  }, [isOpen, task, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (label) => {
    setFormData((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <div className="bg-white w-full max-w-md p-6 h-full overflow-y-auto shadow-lg z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Task" : "Add Task"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Labels</label>
            <div className="flex flex-wrap gap-2">
              {availableLabels.map((label) => (
                <label key={label} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={formData.labels.includes(label)}
                    onChange={() => handleCheckboxChange(label)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500">
              e.g., To Do, In Progress, Done
            </p>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium">Assign To</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {mode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDrawer;
