import { useEffect, useState } from "react";

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

const priorities = ["High", "Medium", "Low"];
const availableLabels = ["Frontend", "Backend", "Bug", "Urgent"];

const TaskForm = ({ task, onSave, users }) => {
  const [formData, setFormData] = useState(defaultTask);

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        labels: Array.isArray(task.labels) ? task.labels : [],
      });
    } else {
      setFormData({ ...defaultTask, id: Date.now().toString() });
    }
  }, [task]);

  const handleCheckboxChange = (label) => {
    setFormData((prev) => ({
      ...prev,
      labels: (prev.labels || []).includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...(prev.labels || []), label],
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ ...defaultTask, id: Date.now().toString() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {task ? "Edit Task" : "Create Task"}
      </h2>

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
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
        <p className="text-xs text-gray-500">e.g., To Do, In Progress, Done</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Labels</label>
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
        <label className="block text-sm font-medium">Assigned User</label>
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
