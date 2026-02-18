import { useAuthContext } from "../../context/AuthContextProvider";
import LandingPageNavElements from "./LandingPageNavElements";
import LoggedInNavElements from "./LoggedInNavElements";

const Navbar = () => {
  const { accessToken } = useAuthContext();

  return (
    <nav className="border-default sticky start-0 top-0 z-20 min-h-16 w-full border-b border-neutral-100 bg-white/80 text-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="placeholder.svg" alt="" />
          <span className="self-center font-semibold">ProductName</span>
        </a>
        {accessToken ? <LoggedInNavElements /> : <LandingPageNavElements />}
      </div>
    </nav>
  );
};

export default Navbar;
