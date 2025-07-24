const ThemeToggle = ({ toggleDark }) => {
  return (
    <button onClick={toggleDark} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
      🌙 / ☀️
    </button>
  );
};

export default ThemeToggle;
