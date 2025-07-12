"use client"

import { useState } from "react"
import { SidebarIcon, LogoIcon } from "@/components/icons"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarLogoToggle() {
  const { open, toggleSidebar } = useSidebar()
  const [hovered, setHovered] = useState(false)

  const showSidebarIcon = hovered || open

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggleSidebar}
      className="cursor-pointer transition-all duration-300 p-2"
    >
      {showSidebarIcon ? (
        <SidebarIcon className="w-6 h-6" />
      ) : (
        <LogoIcon className="w-6 h-6" />
      )}
    </div>
  )
}