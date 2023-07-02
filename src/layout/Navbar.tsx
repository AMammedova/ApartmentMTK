import { NavLink, useLocation } from "react-router-dom";

import {
  Squares2X2Icon,
  BriefcaseIcon,
  UsersIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  BellIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import {
  Squares2X2Icon as Squares2X2IconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  UsersIcon as UsersIconSolid,
  ListBulletIcon as ListBulletIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  BellIcon as BellIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

import { ReactComponent as Logo } from "../assets/logo.svg";
import React, { useState } from "react";

interface ISidebarItems {
  name: string;
  path: string;
  icon: any;
  iconSolid: any;
  children?: { name: string; path: string }[];
}

type NavItemProps = {
  name: string;
};

const NavItem = ({
  name,
  path,
  icon,
  iconSolid,
  children,
}: NavItemProps & ISidebarItems) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();

  const [isRollup, setRollup] = useState<boolean>(false);
  return (
    <React.Fragment>
      <NavLink
        key={path}
        to={path}
        className={`flex  items-center relative justify-center w-12 px-2 py-3 group-hover:w-full border border-line rounded-full ${
          isExpanded ? "bg-primary" : "bg-white"
        }`}
        onClick={() => {
          pathname == "/" ? setIsExpanded(false) : null;
        }}
      >
        <li
          className="flex justify-center w-full"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-center w-full gap-1 px-2 group-hover:justify-between">
            <div>{isExpanded ? iconSolid : icon}</div>
            <div
              className={`hidden scale-0 w-[80%] whitespace-nowrap group-hover:scale-100 group-hover:flex items-center h-full font-semibold  ${
                isExpanded ? "text-white bg-primary" : "bg-transparent"
              }  rounded-full`}
            >
              {name}
            </div>
            {pathname &&
              (pathname == "/" ? null : (
                <div className="hidden group-hover:block">
                  {isExpanded && isExpanded ? (
                    <ChevronUpIcon className="w-[14px] text-cyan-50 translate-x-1" />
                  ) : (
                    <ChevronDownIcon className="w-[14px] translate-x-1 text-cyan-50" />
                  )}{" "}
                </div>
              ))}
          </div>
        </li>
      </NavLink>
      {name === "Dashboard"
        ? null
        : isExpanded &&
          children &&
          Array.isArray(children) && (
            <div className="hidden group-hover:block">
              {children.map((child) => {
                return (
                  <NavLink
                    key={child.path}
                    to={`${child.path}`}
                    className={`flex flex-col text-[16px] font-medium cursor-pointer  mt-4 ml-6 ${
                      pathname === child?.path
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {child.name}
                  </NavLink>
                );
              })}
            </div>
          )}
    </React.Fragment>
  );
};

const Navbar = () => {
  const sidebarItems: ISidebarItems[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Squares2X2Icon className="w-5 h-5" />,
      iconSolid: <Squares2X2IconSolid className="w-5 h-5 fill-white" />,
    },
    {
      name: "References",
      path: "",
      icon: <BriefcaseIcon className="w-5 h-5" />,
      iconSolid: <BriefcaseIconSolid className="w-5 h-5 fill-white" />,
      children: [
        { name: "Users", path: "/references/users" },
        { name: "Objects", path: "/references/objects" },
        // { name: "RentRooms", path: "/references/rentrooms" },
        { name: "Buildings", path: "/references/buildings" },
        { name: "Companies", path: "/references/companies" },
        { name: "Apartments", path: "/references/apartments" },
        { name: "Employees", path: "/references/employees" },
        { name: "Residents", path: "/references/residents" },
        { name: "VendorRooms", path: "/references/vendorRooms" },
        { name: "Transport", path: "/references/transport" },
      ],
    },
    {
      name: "Control Panel",
      path: "",
      icon: <UsersIcon className="w-5 h-5" />,
      iconSolid: <UsersIconSolid className="w-5 h-5 fill-white" />,
      children: [{ name: "Deals", path: "/control-panel/deals" }],
    },
    {
      name: "Sos",
      path: "",
      icon: <ListBulletIcon className="w-5 h-5" />,
      iconSolid: <ListBulletIconSolid className="w-5 h-5 fill-white" />,
      children: [{ name: "Accident", path: "/sos/accident" }],
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <CalendarDaysIcon className="w-5 h-5" />,
      iconSolid: <CalendarDaysIconSolid className="w-5 h-5 fill-white" />,
    },
    {
      name: "Notification",
      path: "/notification",
      icon: <BellIcon className="w-5 h-5" />,
      iconSolid: <BellIconSolid className="w-5 h-5 fill-white" />,
    },
    {
      name: "Settings",
      path: "",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      iconSolid: <Cog6ToothIconSolid className="w-5 h-5 fill-white" />,
      children: [
        { name: "OrderType", path: "/settings/ordertype" },
        { name: "Parking", path: "/settings/parking" },
      ],
    },
  ];

  return (
    <div
      className={`fixed group z-10 sidebar-overlay transition-all w-[92px] hover:w-2/12 duration-300 min-h-screen border-r bg-background border-line`}
    >
      <div className="px-5 py-[23.5px] border-b border-line">
        <div className="flex items-center justify-center w-12 h-12 rounded bg-dark">
          <Logo />
        </div>
      </div>

      <ul className="p-5 space-y-4 overflow-x-hidden overflow-y-auto h-[80vh]">
        {sidebarItems.map(
          ({ name, path, icon, iconSolid, children }: ISidebarItems) => (
            <NavItem
              key={name}
              name={name}
              path={path}
              icon={icon}
              iconSolid={iconSolid}
              children={children}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Navbar;
