
const DeleteModal = ({
  confirmDeleteColumn,
  columnToDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete the column "
          <strong>{columnToDelete}</strong>"?
          <br />
          All associated tasks will be removed.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeleteColumn}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal