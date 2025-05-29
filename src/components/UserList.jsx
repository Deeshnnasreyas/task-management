const UserList = ({ users, onDelete, onEdit }) => {
  return (
    <>
      {users.length > 0 && (
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Manage Users
        </h2>
      )}

      {/* Mobile Cards */}
      <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded shadow-md transition-all duration-300 ease-in-out"
          >
            <h3 className="font-bold">{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Company: {user.company}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block mt-4 overflow-x-auto">
        {users.length > 0 && (
          <table className="w-full bg-white rounded shadow-md transition-all duration-300 ease-in-out">
            <thead>
              <tr className="text-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
                <th className="text-left px-4 py-2 text-semibold  text-blue-500">
                  Name
                </th>
                <th className="text-left px-4 py-2 text-semibold  text-blue-500">
                  Email
                </th>
                <th className="text-left px-4 py-2 text-semibold  text-blue-500">
                  Phone
                </th>
                <th className="text-left px-4 py-2 text-semibold  text-blue-500">
                  Company
                </th>
                <th className="text-left px-4 py-2 text-semibold  text-blue-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.company}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserList;
