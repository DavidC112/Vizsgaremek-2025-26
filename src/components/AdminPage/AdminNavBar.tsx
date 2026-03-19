import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { X, Menu } from "lucide-react";
import LoggedInNavElements from "../Navbar/LoggedInNavElements";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Users", href: "/admin/users" },
  { name: "Activities", href: "/admin/activities" },
  { name: "Ingredients", href: "/admin/ingredients" },
  { name: "Recipes", href: "/admin/recipes" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure
      as="nav"
      className="border-default sticky start-0 top-0 z-20 min-h-16 w-full border-b border-neutral-100 bg-white/80 text-xl backdrop-blur-md"
    >
      <div className="relative flex items-center p-4">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton className="group hover:bg-primary-green-50 hover:text-primary-green-600 focus:outline-primary-green-400 relative m-4 inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors focus:outline-2 focus:-outline-offset-1">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open menu</span>
            <Menu
              aria-hidden="true"
              className="block size-5 group-data-open:hidden"
            />
            <X
              aria-hidden="true"
              className="hidden size-5 group-data-open:block"
            />
          </DisclosureButton>
        </div>

        <div className="flex shrink-0 items-center pl-12 sm:pl-0">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/placeholder.svg" alt="" />
            <span className="self-center font-semibold">ProductName</span>
          </a>
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 sm:block">
          <div className="flex h-16 items-center gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                className={({ isActive }) =>
                  classNames(
                    "relative flex h-full items-center px-3 text-sm transition-colors",
                    isActive
                      ? "text-primary-green-600 after:bg-primary-green-400 font-semibold after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full"
                      : "hover:text-primary-green-500 font-normal text-gray-500",
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <LoggedInNavElements />
        </div>
      </div>

      <DisclosurePanel className="border-t border-gray-100 sm:hidden">
        <div className="flex flex-col gap-1 px-3 py-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-primary-green-50 text-primary-green-700 border-primary-green-400 border-l-2 font-medium"
                    : "hover:text-primary-green-600 text-gray-500 hover:bg-gray-50",
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
