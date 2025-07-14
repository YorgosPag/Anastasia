"use client"

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarToggleButton } from "@/components/ui/sidebar"
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"
import { BarChart2, Briefcase, FileText, Grid, HelpCircle, Settings, Users, FileBarChart, LogOut, Package, List, BookUser, SlidersHorizontal, Printer, Star } from "lucide-react";
import { InteractiveLogo } from "./interactive-logo"
import { Separator } from "./ui/separator";

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
                        <SidebarMenuButton isActive tooltip="Πίνακας Ελέγχου">
                            <Grid />
                            <span className="group-data-[state=collapsed]:hidden">Πίνακας Ελέγχου</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Λίστα Έργων">
                            <Briefcase />
                            <span className="group-data-[state=collapsed]:hidden">Λίστα Έργων</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Λίστα Επαφών">
                            <Users />
                            <span className="group-data-[state=collapsed]:hidden">Λίστα Επαφών</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Αναφορές">
                            <FileBarChart />
                            <span className="group-data-[state=collapsed]:hidden">Αναφορές</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Προσφορές Προμηθευτών">
                            <Package />
                            <span className="group-data-[state=collapsed]:hidden">Προσφορές Προμηθευτών</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Οδηγίες">
                            <HelpCircle />
                            <span className="group-data-[state=collapsed]:hidden">Οδηγίες</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Separator className="my-2" />
                 <p className="px-2 text-xs font-semibold text-muted-foreground group-data-[state=collapsed]:hidden">Διαχείριση</p>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Κατάλογος Παρεμβάσεων">
                            <BookUser />
                            <span className="group-data-[state=collapsed]:hidden">Κατάλογος Παρεμβάσεων</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Προσαρμοσμένες Λίστες">
                           <SlidersHorizontal />
                            <span className="group-data-[state=collapsed]:hidden">Προσαρμοσμένες Λίστες</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Ρυθμίσεις">
                           <Settings />
                            <span className="group-data-[state=collapsed]:hidden">Ρυθμίσεις</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton tooltip="Αποσύνδεση">
                            <LogOut />
                            <span className="group-data-[state=collapsed]:hidden">Αποσύνδεση</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarToggleButton />
            </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-1 overflow-y-auto relative p-6">
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
