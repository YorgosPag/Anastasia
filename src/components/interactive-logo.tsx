"use client"

import { useState } from "react"
import { Logo } from "./logo"
import { SidebarIcon } from "./icons"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

export function InteractiveLogo() {
  const { open, toggleSidebar } = useSidebar()
  const [hovered, setHovered] = useState(false)

  const isCollapsed = !open;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggleSidebar}
      className="cursor-pointer h-full flex items-center justify-center w-full"
    >
      <div className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-auto" : "w-full px-2"
      )}>
        {isCollapsed && !hovered ? (
          <Logo />
        ) : (
          <div className="p-2">
            <SidebarIcon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
