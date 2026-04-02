import { Link, useLocation } from "react-router";
import { useAuthContext } from "../../context/AuthContextProvider";
import { useUserContext } from "../../context/UserContext";
import LandingPageNavElements from "./LandingPageNavElements";
import LoggedInNavElements from "./LoggedInNavElements";

const userNavigation = [
  { name: "Dashboard", to: "/" },
  { name: "Statistics", to: "/stats" },
  { name: "Meal plan", to: "/meal-plan" },
  { name: "Recipes", to: "/recipes" },
];

const adminNavigation = [
  { name: "Users", to: "/admin/users" },
  { name: "Activities", to: "/admin/activities" },
  { name: "Ingredients", to: "/admin/ingredients" },
  { name: "Recipes", to: "/admin/recipes" },
];

const Navbar = () => {
  const location = useLocation();
  const { accessToken } = useAuthContext();
  const { singleUser } = useUserContext();

  const navigation =
    singleUser?.role === "Admin" && location.pathname.startsWith("/admin")
      ? adminNavigation
      : userNavigation;

  return (
    <nav className="border-default sticky start-0 top-0 z-20 min-h-16 w-full border-b border-neutral-100 bg-white/80 text-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="logo.png" alt="" className="object-fit w-20" />
          <span className="self-center font-semibold">NutriLife</span>
        </Link>
        {accessToken ? (
          <LoggedInNavElements navigation={navigation} />
        ) : (
          <LandingPageNavElements />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
