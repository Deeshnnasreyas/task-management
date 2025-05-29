const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onArchive,
  users = [],
}) => {
  const user = users.find((u) => String(u.id) === String(task.assignedTo));
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", String(task.id));
  };
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-3 rounded shadow hover:shadow-md cursor-move relative"
    >
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="text-xs text-gray-500 mt-1">
        Priority: <span className="font-medium">{task.priority}</span> <br />
        Due: {task.dueDate || "None"} <br />
        User: {user ? user.name : "Unassigned"} <br />
        Labels: {task.labels.join(", ")}
      </div>

      <div className="mt-2 flex gap-2 flex-wrap">
        <button
          onClick={() => onEdit(task)}
          //   onClick={onEdit}
          className="text-blue-600 text-xs hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="text-red-600 text-xs hover:underline"
        >
          Delete
        </button>
        <button
          onClick={() => onToggleComplete(task.id)}
          className="text-green-600 text-xs hover:underline"
        >
          {task.completed ? "Undo Complete" : "Mark Complete"}
        </button>
        <button
          onClick={() => onArchive(task.id)}
          className="text-yellow-600 text-xs hover:underline"
        >
          Archive
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
