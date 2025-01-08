import { Drawer } from "flowbite-react";
import PropTypes from "prop-types";
import Search from "./Search";
import { TabData } from "./Tab/TabsData";
import { NavLink } from "react-router-dom";

export function MobileDrawer({ isOpen, onClose }) {
  return (
    <Drawer open={isOpen} onClose={onClose} className="lg:hidden visible">
      <Drawer.Header title="MENU" titleIcon={() => <></>} />
      <Drawer.Items>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Search</p>
        <Search />
        <ul className="space-y-2 font-medium mt-3">
          {TabData.map((Tab, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                to={Tab.path}
              >
                <Tab.icon />
                <span className="ms-3">{Tab.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </Drawer.Items>
    </Drawer>
  );
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
