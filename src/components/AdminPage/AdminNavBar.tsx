import { Link } from "react-router-dom";
import LoggedInNavElements from "../Navbar/LoggedInNavElements";

const AdminNavBar = () => {
  return (
    <nav className="border-default sticky start-0 top-0 z-20 min-h-16 w-full border-b border-neutral-100 bg-white/80 text-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="placeholder.svg" alt="" />
          <span className="self-center font-semibold">ProductName</span>
        </a>
        <div className="mx-auto justify-between space-x-3 bg-emerald-100">
          <Link to="users" className="rounded bg-white px-2 py-1">
            Users
          </Link>
          <Link to="activities" className="">
            Activities
          </Link>
          <Link to="ingredients" className="">
            Ingredients
          </Link>
          <Link to="recipes" className="">
            Recipes
          </Link>
        </div>
        {<LoggedInNavElements />}
      </div>
    </nav>
  );
};

export default AdminNavBar;
