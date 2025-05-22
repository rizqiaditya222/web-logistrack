"use client";

import React, { useState } from "react";
import Link from "next/link";

const menuItems = [
  {
    label: "Home",
    icon: "Sidebar/home.svg",
    activeIcon: "Sidebar/home-active.svg",
    href: "/Home",
  },
  {
    label: "Stock",
    icon: "Sidebar/stock.svg",
    activeIcon: "Sidebar/stock-active.svg",
    href: "/stock",
  },
  {
    label: "Manage",
    icon: "Sidebar/manage.svg",
    activeIcon: "Sidebar/manage-active.svg",
    href: "/Manage",
  },
 
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="h-auto w-[21%] shadow-2xl">
      <div className="flex items-center justify-center pt-12">
        <img src="Sidebar/logologistrack.png" alt="Logo Logistrack" />
      </div>
      <hr className="border-t border-[#707375] my-10 mx-5" />

      <ul className="flex flex-col -mt-5 text-[#3D3F40] font-semibold">
        {menuItems.map((item, index) => {
          const isActive = activeItem === item.label;
          const isHovered = hoveredItem === item.label;

          return (
            <Link
              href={item.href}
              key={index}
              onClick={() => setActiveItem(item.label)}
              className="block"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <li
                className={`
                  flex items-center gap-3 h-[3.875rem] px-5 cursor-pointer
                  bg-white
                  ${isActive 
                    ? "bg-[#F0ECF8] border-l-[6px] border-[#0A53FE] text-[#0A53FE]" 
                    : isHovered
                      ? "bg-gradient-to-b from-white to-[#FCF2FF] border-l-[6px] border-[#063298]"
                      : "border-l-[6px] border-transparent"
                  }
                  transition-colors duration-300
                `}
              >
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={`${item.label} Icon`}
                  className="w-auto h-auto"
                />
                {item.label}
              </li>
            </Link>
          );
        })}
        
      </ul>
    </div>
  );
}

export default Sidebar;
