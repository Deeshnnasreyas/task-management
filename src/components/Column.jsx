import { useState } from "react";
import TaskCard from "./TaskCard";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
const Column = ({
  title,
  tasks,
  users,
  onDrop,
  onEdit,
  onDelete,
  onToggleComplete,
  onArchive,
  onRename,
  onRemove,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(title);
  return (
    <div
      className={`w-72 flex-shrink-0 bg-gray-100 rounded p-3 space-y-3 ${
        dragOver ? "border-2 border-blue-500" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        onDrop(taskId);
        setDragOver(false);
      }}
    >
      <div className="flex justify-between items-center">
        {isRenaming ? (
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => {
              onRename(newName);
              setIsRenaming(false);
            }}
            className="border px-1 py-0.5 rounded text-sm"
            autoFocus
          />
        ) : (
          <h3 className="text-lg font-semibold">{title}</h3>
        )}

        <div className="flex gap-1 text-sm">
          <button
            data-tooltip-id="rename-tooltip"
            data-tooltip-content="Rename Column"
            className="text-blue-500 hover:underline flex items-center gap-1"
            onClick={() => setIsRenaming(true)}
          >
            <FaEdit />
          </button>

          <button
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Delete Column"
            className="text-red-500 hover:underline flex items-center gap-1"
            onClick={onRemove}
          >
            <FaTrashAlt />
          </button>

          {/* Tooltip Component */}
          <Tooltip id="rename-tooltip" place="top" />
          <Tooltip id="delete-tooltip" place="top" />
        </div>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          users={users}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          onToggleComplete={onToggleComplete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};
export default Column