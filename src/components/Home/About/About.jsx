import { NavLink, Outlet } from "react-router-dom";

export default function About() {
  const items = [
    {
      title: "Overview",
      href: `overview`,
    },
    {
      title: "Work and education",
      href: "work-and-education",
    },
    {
      title: "Contact and basic info",
      href: "contact-and-basic-info",
    },
  ];
  return (
    <div className="mt-5 flex-1 w-[60vw] flex bg-white rounded-md">
      <aside
        id="separator-sidebar"
        className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            {items.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                      isActive ? "bg-[#38bdf8] text-white" : ""
                    }`
                  }
                >
                  <span className="ms-3">{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="flex-1 mt-3">
        <Outlet />
      </div>
    </div>
  );
}
