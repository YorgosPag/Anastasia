"use client"

import * as React from "react"
import { Monitor, Smartphone } from "lucide-react"

import { useViewMode } from "@/components/providers/view-mode-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ViewModeToggle() {
  const { viewMode, toggleViewMode } = useViewMode()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleViewMode} aria-label="Toggle view mode">
            <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" style={{ display: viewMode === 'mobile' ? 'none' : 'block' }}/>
            <Smartphone className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" style={{ display: viewMode === 'desktop' ? 'none' : 'block' }}/>
            <span className="sr-only">Toggle view mode</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Εναλλαγή Προβολής: {viewMode === 'desktop' ? 'Κινητό' : 'Desktop'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}