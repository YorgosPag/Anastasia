"use client"

import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarToggleButton } from "@/components/ui/sidebar"
import { useViewMode } from "./providers/view-mode-provider"
import { Header } from "@/components/header"
import { BookUser, Briefcase, FileBarChart, Grid, HelpCircle, LogOut, Package, Settings, SlidersHorizontal, Users } from "lucide-react";
import { InteractiveLogo } from "./interactive-logo"
import { Separator } from "./ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

function AppSidebar() {
  const pathname = usePathname();
  return (
    <>
      <SidebarHeader>
        <InteractiveLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" className="w-full">
                <SidebarMenuButton isActive={pathname === '/'} tooltip="Πίνακας Ελέγχου">
                    <Grid />
                    <span className="group-data-[state=collapsed]:hidden">Πίνακας Ελέγχου</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/projects" className="w-full">
                <SidebarMenuButton isActive={pathname === '/projects'} tooltip="Λίστα Έργων">
                    <Briefcase />
                    <span className="group-data-[state=collapsed]:hidden">Λίστα Έργων</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/contacts" className="w-full">
                <SidebarMenuButton isActive={pathname === '/contacts'} tooltip="Λίστα Επαφών">
                    <Users />
                    <span className="group-data-[state=collapsed]:hidden">Λίστα Επαφών</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/reports" className="w-full">
                <SidebarMenuButton isActive={pathname.startsWith('/reports')} tooltip="Αναφορές">
                    <FileBarChart />
                    <span className="group-data-[state=collapsed]:hidden">Αναφορές</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/supplier-offers" className="w-full">
                    <SidebarMenuButton isActive={pathname === '/supplier-offers'} tooltip="Προσφορές Προμηθευτών">
                        <Package />
                        <span className="group-data-[state=collapsed]:hidden">Προσφορές Προμηθευτών</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/instructions" className="w-full">
                    <SidebarMenuButton isActive={pathname === '/instructions'} tooltip="Οδηγίες">
                        <HelpCircle />
                        <span className="group-data-[state=collapsed]:hidden">Οδηγίες</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-2" />
          <p className="px-2 text-xs font-semibold text-muted-foreground group-data-[state=collapsed]:hidden">Διαχείριση</p>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/interventions" className="w-full">
                    <SidebarMenuButton isActive={pathname === '/interventions'} tooltip="Κατάλογος Παρεμβάσεων">
                        <BookUser />
                        <span className="group-data-[state=collapsed]:hidden">Κατάλογος Παρεμβάσεων</span>
                    </SidebarMenuButton>
                </Link>
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
    </>
  );
}


function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-full w-full">
        <Sidebar>
            <AppSidebar />
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
          <Sidebar>
             <AppSidebar />
          </Sidebar>
          <div className="flex h-full w-full flex-col">
            <Header/>
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