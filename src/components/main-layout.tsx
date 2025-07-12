"use client"

import { cn } from "@/lib/utils"
import { SidebarProvider, Sidebar as AppSidebar } from "@/components/ui/sidebar"
import { SidebarProvider as OriginalSidebarProvider, Sidebar as OriginalSidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarToggleButton } from "@/components/original-sidebar";
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"
import { Logo } from "./logo";
import { Users } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode()

  if (viewMode === 'desktop') {
    return (
      <OriginalSidebarProvider>
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
      </OriginalSidebarProvider>
    )
  }

  // Mobile View
  return (
    <div id="mobile-device-frame">
        <div className="flex h-full w-full flex-col">
          <Header/>
          <AppSidebar />
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
          <Layout>{children}</Layout>
       </div>
    </SidebarProvider>
  )
}