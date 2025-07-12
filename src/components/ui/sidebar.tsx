"use client"

import * as React from "react"
import { PanelLeft, Users } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Logo } from "@/components/logo"
import { Separator } from "./separator"
import { useSidebar as useOriginalSidebar, Sidebar as OriginalSidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarToggleButton } from "@/components/original-sidebar";

type SidebarContextValue = {
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  isMobile: boolean;
} | null;


const SidebarContext = React.createContext<SidebarContextValue>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const toggleSidebar = () => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    }
  }

  const value = {
    openMobile,
    setOpenMobile,
    toggleSidebar,
    isMobile,
  }

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

export function Sidebar() {
    const { openMobile, setOpenMobile, isMobile } = useSidebar()
    const { state: originalState } = useOriginalSidebar();

    if (!isMobile) {
        return (
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
        )
    }

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side="left"
        className="z-50 w-72 p-0 bg-sidebar text-sidebar-foreground rounded-r-xl shadow-xl"
      >
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center px-4 py-3">
            <Logo />
          </div>
          <Separator />
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Λίστα Επαφών
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SidebarTrigger() {
  const { toggleSidebar, isMobile } = useSidebar()
  if (!isMobile) return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleSidebar}
      className="h-8 w-8 text-muted-foreground"
    >
      <PanelLeft className="h-5 w-5" />
    </Button>
  )
}