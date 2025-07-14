"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { ViewModeToggle } from "./view-mode-toggle"
import { Logo } from "./logo"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
       <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger />
          <Logo />
       </div>
       
       <div className="hidden md:block">
         {/* Placeholder for desktop view header content if needed */}
       </div>

       <div className="flex flex-1 items-center justify-end gap-2">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Δημιουργία Έργου / Προσφοράς
        </Button>
        <ThemeToggle />
        <ViewModeToggle />
        <UserNav />
       </div>
    </header>
  )
}
