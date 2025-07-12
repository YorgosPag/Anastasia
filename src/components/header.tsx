import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"
import { ViewModeToggle } from "./view-mode-toggle"
import { useViewMode } from "./providers/view-mode-provider"

export function Header({ children }: { children?: React.ReactNode }) {
  const { viewMode } = useViewMode();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       { viewMode === 'mobile' && <SidebarTrigger /> }
       <div className="flex-1">{children}</div>
       <div className="flex items-center gap-2">
        <ThemeToggle />
        <ViewModeToggle />
        <UserNav />
       </div>
    </header>
  )
}
