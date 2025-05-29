import { useState, useEffect } from "react";
import Column from "./Column";
import toast from "react-hot-toast";
import { MdViewColumn } from "react-icons/md";
import DeleteModal from "./DeleteModal";
const KanbanBoard = ({
  tasks,
  users,
  onTaskDrop,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  onArchive,
}) => {
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState("");
  const [columnToDelete, setColumnToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("columns")) || [];

    const taskStatuses = Array.from(
      new Set(
        tasks.map((task) => task.status?.trim()).filter((status) => status)
      )
    );

    const mergedColumns = Array.from(
      new Set([...savedColumns, ...taskStatuses])
    );

    setColumns(mergedColumns);
  }, [tasks]);

  const saveColumns = (updated) => {
    setColumns(updated);
    localStorage.setItem("columns", JSON.stringify(updated));
  };

  const handleAddColumn = () => {
    if (newColumn.trim() && !columns.includes(newColumn)) {
      const updated = [...columns, newColumn];
      saveColumns(updated);
    }
    setNewColumn("");
    toast.success("Column added successfully!");
  };

  const handleRenameColumn = (oldName, newName) => {
    if (newName.trim() && !columns.includes(newName)) {
      const updatedColumns = columns.map((col) =>
        col === oldName ? newName : col
      );
      saveColumns(updatedColumns);

      // Update task status
      const updatedTasks = tasks.map((task) =>
        task.status === oldName ? { ...task, status: newName } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      window.location.reload();
    }
  };

  // const handleRemoveColumn = (colName) => {
  //   const updated = columns.filter((col) => col !== colName);
  //   saveColumns(updated);
  //   const updatedTasks = tasks.filter((task) => task.status !== colName);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  //   window.location.reload();
  // };
  const handleRemoveColumn = (colName) => {
    setColumnToDelete(colName);
    setIsDeleteModalOpen(true);
  };
  const confirmDeleteColumn = () => {
    const updated = columns.filter((col) => col !== columnToDelete);
    saveColumns(updated);

    const updatedTasks = tasks.filter((task) => task.status !== columnToDelete);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setIsDeleteModalOpen(false);
    setColumnToDelete(null);
    window.location.reload();
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center mb-4 gap-2">
        <input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="Add new column"
          className="w-full lg:w-1/2 border px-3 py-1 rounded"
        />

        <button
          onClick={handleAddColumn}
          className="flex items-center px-4 py-1 rounded text-white font-semibold bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition duration-300 ease-in-out cursor-pointer shadow"
        >
          <MdViewColumn className="mr-2" size={18} />
          Add Column
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            tasks={tasks.filter(
              (t) => t.status?.toLowerCase() === col.toLowerCase()
            )}
            users={users}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onArchive={onArchive}
            onDrop={(taskId) => onTaskDrop(taskId, col)}
            onRename={(newName) => handleRenameColumn(col, newName)}
            onRemove={() => handleRemoveColumn(col)}
          />
        ))}
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          confirmDeleteColumn={confirmDeleteColumn}
          columnToDelete={columnToDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
