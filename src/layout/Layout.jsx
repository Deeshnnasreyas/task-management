const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden ">
      <main className="p-4 bg-gray-100 flex-1 overflow-auto bg-gradient-to-br from-blue-500 via-white to-pink-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
