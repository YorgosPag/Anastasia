"use client"

import { SidebarProvider as OriginalSidebarProvider, SidebarInset } from "@/components/original-sidebar";
import { cn } from "@/lib/utils"
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar"
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"

function AppLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode()

  if (viewMode === 'desktop') {
    return (
      <OriginalSidebarProvider>
        <div className={cn("flex h-full w-full")}>
          <Sidebar />
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 overflow-hidden relative p-4">
              {children}
            </main>
          </SidebarInset>
        </div>
      </OriginalSidebarProvider>
    )
  }

  // Mobile View
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <Sidebar />
      <main className="relative flex-1 overflow-y-auto bg-background p-4">
        {children}
      </main>
    </div>
  )
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode()

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
