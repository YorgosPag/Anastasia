"use client"

import { useState } from "react"
import { Logo } from "./logo"
import { SidebarIcon, LogoIcon } from "./icons"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

export function InteractiveLogo() {
  const { open, toggleSidebar } = useSidebar()
  const [hovered, setHovered] = useState(false)

  const isCollapsed = !open;

  if (isCollapsed) {
    return (
       <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggleSidebar}
        className="cursor-pointer h-full flex items-center justify-center w-full p-2"
      >
        {hovered ? <SidebarIcon className="w-6 h-6" /> : <LogoIcon className="w-6 h-6 text-primary" />}
      </div>
    )
  }

  return (
    <div
      onClick={toggleSidebar}
      className="cursor-pointer h-full flex items-center justify-between w-full p-2"
    >
      <Logo />
      <SidebarIcon className="w-6 h-6" />
    </div>
  )
}
