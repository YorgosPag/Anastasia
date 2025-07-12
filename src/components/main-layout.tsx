"use client"

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarToggleButton } from "@/components/ui/sidebar"
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"
import { Users } from "lucide-react";
import { InteractiveLogo } from "./interactive-logo"

function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-full w-full">
        <Sidebar>
            <SidebarHeader>
              <InteractiveLogo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Contact List">
                            <Users />
                            <span className="group-data-[state=collapsed]:hidden">Λίστα Επαφών</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarToggleButton />
            </SidebarFooter>
        </Sidebar>
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
      <div id="root-container" className={cn(viewMode === 'mobile' ? 'mobile-view' : 'desktop-view flex h-screen w-full')}>
        {viewMode === 'mobile' ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}
      </div>
  )
}
