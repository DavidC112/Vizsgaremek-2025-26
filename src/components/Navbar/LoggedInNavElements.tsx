import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { logoutUser } from "../../services/auth";
import { Link, NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";

const defaultNavigation = [
  { name: "Dashboard", to: "/" },
  { name: "Statistics", to: "/stats" },
  { name: "Meal plan", to: "/meal-plan" },
  { name: "Recipes", to: "/recipes" },
];

type Props = {
  navigation?: { name: string; to: string }[];
};

const LoggedInNavElements = ({ navigation = defaultNavigation }: Props) => {
  const { singleUser, fetchUser } = useUserContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      {/* Desktop nav links */}
      <div className="hidden md:flex md:gap-2 md:text-sm">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end
            className={({ isActive }) =>
              `border-b-2 px-3 py-4 transition-colors ${
                isActive
                  ? "border-primary-green-500 font-semibold"
                  : "border-transparent font-light hover:border-gray-500 hover:font-normal"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Desktop user menu */}
      <div className="hidden md:block">
        <Menu as="div" className="relative inline-block">
          <MenuButton className="flex items-center justify-center space-x-2 data-closed:border-none">
            <p className="text-sm">{`${singleUser?.firstName} ${singleUser?.lastName}`}</p>
            <img
              src={singleUser?.profilePictureUrl}
              alt=""
              className="inline-block size-12 rounded-full object-cover"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white outline-1 -outline-offset-1 outline-neutral-300 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-black data-focus:bg-neutral-50 data-focus:outline-hidden"
                >
                  Profile
                </Link>
              </MenuItem>
              {singleUser?.role === "Admin" && (
                <MenuItem>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-black data-focus:bg-neutral-50 data-focus:outline-hidden"
                  >
                    Admin Panel
                  </Link>
                </MenuItem>
              )}
              <form>
                <MenuItem>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 data-focus:bg-neutral-50 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div>

      <div className="md:hidden">
        <IconButton
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          size="large"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="flex w-76 items-center justify-between border-b border-neutral-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={singleUser?.profilePictureUrl}
              alt=""
              className="inline-block size-12 rounded-full object-cover"
            />
            <p className="text-sm font-medium">{`${singleUser?.firstName} ${singleUser?.lastName}`}</p>
          </div>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="mb-auto flex flex-col text-sm">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `border-l-4 px-5 py-4 transition-colors ${
                  isActive
                    ? "border-primary-green-500 bg-neutral-50 font-semibold"
                    : "border-transparent font-light hover:bg-neutral-50 hover:font-normal"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="my-1 border-t border-neutral-200" />

        <div className="flex flex-col align-bottom text-sm">
          <Link
            to="/profile"
            onClick={() => setDrawerOpen(false)}
            className="px-5 py-4 text-black hover:bg-neutral-50"
          >
            Profile
          </Link>
          {singleUser?.role === "Admin" && (
            <Link
              to="/admin"
              onClick={() => setDrawerOpen(false)}
              className="px-5 py-4 text-black hover:bg-neutral-50"
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              setDrawerOpen(false);
            }}
            className="px-5 py-4 text-left text-red-600 hover:bg-neutral-50"
          >
            Sign out
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default LoggedInNavElements;
