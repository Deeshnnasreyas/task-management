const UserTaskList = ({ user, tasks }) => {
  // const assignedTasks = tasks.filter((task) => task.assignedTo === user.id);
  const assignedTasks = tasks.filter(
    (task) => String(task.assignedTo) === String(user.id)
  );

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Tasks by User
      </h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-4">{user.name} - Tasks</h2>

        {assignedTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks assigned.</p>
        ) : (
          <>
            <table className="hidden md:table w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 border-b">Title</th>
                  <th className="text-left px-4 py-2 border-b">Description</th>
                  <th className="text-left px-4 py-2 border-b">Due Date</th>
                  <th className="text-left px-4 py-2 border-b">Priority</th>
                </tr>
              </thead>
              <tbody>
                {assignedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 border-b">{task.title}</td>
                    <td className="px-4 py-2 border-b">{task.description}</td>
                    <td className="px-4 py-2 border-b">{task?.dueDate}</td>
                    <td className="px-4 py-2 border-b">{task?.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* mobile responsive */}
            <div className="md:hidden space-y-4">
              {assignedTasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="font-medium text-lg">{task.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserTaskList;
