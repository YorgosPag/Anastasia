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
                    <span className="group-data-[collapsible=icon]:hidden">
                      {isCollapsed ? '' : 'Collapse Sidebar'}
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode();
  return (
      <div className={cn(
        "flex h-full w-full",
        viewMode === 'mobile' ? 'flex-col' : ''
      )}>
        <Sidebar>
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
            { viewMode !== 'mobile' &&
              <SidebarFooter>
                  <SidebarToggleButton />
              </SidebarFooter>
            }
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 overflow-hidden relative p-4">
              {children}
            </main>
          </SidebarInset>
      </div>
  )
}


export function MainLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode();

  return (
    <SidebarProvider>
      <div id="root-container" className={cn(viewMode === 'mobile' ? 'mobile-view' : 'desktop-view flex h-full')}>
        {viewMode === 'mobile' ? (
          <div id="mobile-device-frame">
              <AppLayout>{children}</AppLayout>
          </div>
        ) : (
          <AppLayout>{children}</AppLayout>
        )}
      </div>
    </SidebarProvider>
  )
}
