"use client"

import { useState } from "react"
import { Logo } from "./logo"
import { SidebarIcon } from "./icons"
import { useSidebar } from "./ui/sidebar"
import { cn } from "@/lib/utils"

export function InteractiveLogo() {
  const { open, toggleSidebar } = useSidebar()
  const [hovered, setHovered] = useState(false)

  const showSidebarIcon = !open || hovered

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggleSidebar}
      className="cursor-pointer transition-all duration-300 h-full flex items-center justify-center w-full"
    >
      <div className={cn(
        "group-data-[state=expanded]:w-full group-data-[state=expanded]:px-2",
        "flex items-center justify-center",
      )}>
        {showSidebarIcon ? (
          <div className={cn("p-2", !open && "p-0")}>
            <SidebarIcon className="w-6 h-6" />
          </div>
        ) : (
          <Logo />
        )}
      </div>
    </div>
  )
}
