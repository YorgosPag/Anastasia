"use client"

import { cn } from "@/lib/utils"
import { SidebarProvider, Sidebar, OriginalSidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarToggleButton } from "@/components/ui/sidebar"
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"
import { Logo } from "./logo";
import { Users } from "lucide-react";
import { SidebarLogoToggle } from "./SidebarLogoToggle"

function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <OriginalSidebar>
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
      </OriginalSidebar>
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-1 overflow-y-auto relative p-4">
          {children}
        </main>
      </div>
    </div>
  )
}


function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="mobile-device-frame">
        <div className="flex h-full w-full flex-col">
          <Header/>
          <Sidebar />
          <main className="relative flex-1 overflow-y-auto bg-background p-4">
            {children}
          </main>
        </div>
    </div>
  )
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode();

  return (
    <SidebarProvider>
      <div className={cn(viewMode === 'mobile' ? 'mobile-view' : 'desktop-view flex h-screen w-full')}>
        {viewMode === 'mobile' ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}
      </div>
    </SidebarProvider>
  )
}
