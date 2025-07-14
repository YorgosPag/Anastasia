"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { ViewModeToggle } from "./view-mode-toggle"
import { Logo } from "./logo"

export function Header() {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
       <div className="flex items-center gap-2">
        {/* Mobile View: Trigger and Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
          <Logo />
        </div>
       </div>

       <div className="flex flex-1 items-center justify-end gap-2">
        <ThemeToggle />
        <ViewModeToggle />
        <UserNav />
       </div>
    </header>
  )
}
