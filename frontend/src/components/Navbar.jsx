import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleDark }) => {
  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-2 shadow">
      <input placeholder="Enter Your Email Here" className="p-2 rounded border w-1/3" />
      <div className="flex gap-4 items-center">
        <ThemeToggle toggleDark={toggleDark} />
        <div className="flex items-center gap-2">
          <span className="text-gray-800 dark:text-white">FIN-MATRIX</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
