"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { Logo } from "@/components/logo"
import { Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useViewMode } from "./providers/view-mode-provider"
import { cn } from "@/lib/utils"

function SidebarToggleButton() {
    const { toggleSidebar, state } = useSidebar();
    const isCollapsed = state === 'collapsed';
    
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleSidebar} tooltip={isCollapsed ? "Expand" : "Collapse"}>
                    {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    <span>{isCollapsed ? '' : 'Collapse Sidebar'}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}


export function MainLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode();

  return (
    <SidebarProvider>
      <Sidebar className={cn(viewMode === 'mobile' && 'hidden')}>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Users />
                <span>Λίστα Επαφών</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarToggleButton />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className={cn(
        "flex flex-col transition-[margin-left] duration-300 ease-in-out",
        viewMode === 'mobile' ? 'm-0 p-0 h-screen' : 'h-auto'
        )}>
        <div id="root-container" className={cn(viewMode === 'mobile' && 'mobile-view')}>
          <Header />
          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
