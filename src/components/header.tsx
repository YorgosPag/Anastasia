"use client"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { ViewModeToggle } from "./view-mode-toggle"
import { InteractiveLogo } from "./interactive-logo"
import { cn } from "@/lib/utils"

export function Header() {
  const { isMobile, open } = useSidebar();
  const isDesktopCollapsed = !isMobile && !open;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
       <div className="flex items-center gap-2">
        {isMobile && <SidebarTrigger />}
        {!isMobile && isDesktopCollapsed && (
            <div className="flex items-center justify-center -ml-2">
                <InteractiveLogo />
            </div>
        )}
       </div>
       <div className="flex items-center gap-2">
        <ThemeToggle />
        <ViewModeToggle />
        <UserNav />
       </div>
    </header>
  )
}
