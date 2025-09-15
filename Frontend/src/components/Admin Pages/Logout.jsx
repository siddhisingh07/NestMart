const Logout = () => {
  const userLogout = () => {
    localStorage.removeItem("token");
  };
  return <button onClick={userLogout} className="px-6 py-2 bg-red-500 text-blue-50 rounded-md font-semibold">Logout</button>;
};

export default Logout;
