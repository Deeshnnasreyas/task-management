import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import KanbanBoard from "../components/KanbanBoard";
import UserTaskList from "../components/UserTaskList";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import TaskDrawer from "../components/TaskDrawer";
import UserDrawer from "../components/UserDrawer";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

const DEFAULT_COLUMNS = ["To Do", "In Progress", "Done"];

const Dashboard = () => {
  document.title = "Task Management | Dashboard";
  const [filterPriority, setFilterPriority] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterLabel, setFilterLabel] = useState("");
  //   const [tasks, setTasks] = useState(() => loadFromStorage("tasks", []));
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [users, setUsers] = useState(() => loadFromStorage("users", []));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isUserDrawerOpen, setUserDrawerOpen] = useState(false);
  const [userMode, setUserMode] = useState("add");
  const [editUserData, setEditUserData] = useState(null);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [taskMode, setTaskMode] = useState("add");

  const [columns] = useState(() => {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : ["To Do", "In Progress", "Done"];
  });

  useEffect(() => {
    saveToStorage("tasks", tasks);
    saveToStorage("users", users);
    saveToStorage("columns", columns);
  }, [tasks, users, columns]);

  const handleDropTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      String(task.id) === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleArchive = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, archived: true } : t))
    );
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    const updated = tasks.filter((t) => t.id !== taskToDelete.id);
    setTasks(updated);
    setShowDeleteModal(false);
    setTaskToDelete(null);
    toast.error("Task deleted!");
  };

  const openAddDrawer = () => {
    setEditTaskData(null);
    setTaskMode("add");
    setDrawerOpen(true);
  };

  const openEditDrawer = (task) => {
    setEditTaskData(task);
    setTaskMode("edit");
    setDrawerOpen(true);
  };

  const handleSaveTask = (task) => {
    const updatedTasks = tasks.some((t) => t.id === task.id)
      ? tasks.map((t) => (t.id === task.id ? task : t))
      : [...tasks, task];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task saved successfully!");
  };

  //add user drawer

  const openAddUserDrawer = () => {
    setEditUserData(null);
    setUserMode("add");
    setUserDrawerOpen(true);
  };

  const openEditUserDrawer = (user) => {
    setEditUserData(user);
    setUserMode("edit");
    setUserDrawerOpen(true);
  };

  const handleSaveUser = (newUser) => {
    let updatedUsers;
    if (userMode === "edit") {
      updatedUsers = users.map((u) => (u.id === newUser.id ? newUser : u));
      toast.success("User updated successfully!");
    } else {
      updatedUsers = [...users, { ...newUser, id: Date.now() }];
      toast.success("User added successfully!");
    }
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUserDrawerOpen(false);
  };

  const handleDeleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    toast.error("User deleted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6 bg-gray-800">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
        Task & User Management
      </h1>

      {/* Task Form */}
      <div className="max-w-3xl mx-auto"></div>
      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveTask}
        task={editTaskData}
        users={users}
        mode={taskMode}
      />
      <UserDrawer
        isOpen={isUserDrawerOpen}
        onClose={() => setUserDrawerOpen(false)}
        userData={editUserData}
        mode={userMode}
        onSave={handleSaveUser}
      />
      {/* Filters */}
      <div className="max-w-5xl mx-auto mb-6">
        <h2 className="text-lg font-semibold mb-2 text-white">Filter Tasks</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter by label"
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <button
            onClick={() => openAddDrawer(true)}
            className="flex items-center px-4 py-1 rounded text-white font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition duration-300 ease-in-out cursor-pointer shadow-md"
          >
            <AiOutlinePlus className="mr-2" size={20} />
            Add Task
          </button>

          <button
            onClick={openAddUserDrawer}
            className="flex items-center px-4 py-2 rounded text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out cursor-pointer shadow"
          >
            <FaUserPlus className="mr-2" size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        columns={columns}
        tasks={tasks.filter((task) => {
          if (filterPriority && task.priority !== filterPriority) return false;
          if (filterUser && task.assignedTo !== filterUser) return false;
          if (filterLabel && !task.labels.includes(filterLabel)) return false;
          return true;
        })}
        users={users}
        onTaskDrop={handleDropTask}
        onToggleComplete={handleToggleComplete}
        onArchive={handleArchive}
        onDeleteTask={handleDeleteClick}
        onEditTask={openEditDrawer}
        onAddTask={openAddDrawer}
      />
      <div className="max-w-7xl mx-auto mt-8 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <UserList
            users={users}
            onEdit={openEditUserDrawer}
            onDelete={handleDeleteUser}
          />
        </div>

        <div className="lg:w-1/2">
          {users.map((user) => (
            <UserTaskList key={user.id} user={user} tasks={tasks} />
          ))}
        </div>
      </div>

      {/* modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>
              Are you sure you want to delete the task{" "}
              <strong>{taskToDelete?.title}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
