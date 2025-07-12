"use client";

import { cn } from "@/lib/utils"
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar"
import { SidebarProvider as OriginalSidebarProvider } from "@/components/original-sidebar";
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"

function AppLayout({ children }: { children: React.ReactNode }) {
  const { viewMode } = useViewMode()

  if (viewMode === 'desktop') {
    return (
      <OriginalSidebarProvider>
          <div className="flex h-full w-full">
            <Sidebar />
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
