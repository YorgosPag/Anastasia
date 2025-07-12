"use client"

import * as React from "react"
import { Monitor, Smartphone } from "lucide-react"

import { useViewMode } from "@/components/providers/view-mode-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ViewModeToggle() {
  const { viewMode, toggleViewMode, isMounted } = useViewMode()

  if (!isMounted) {
    return (
       <Button variant="ghost" size="icon" disabled>
          <Monitor className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleViewMode} aria-label="Toggle view mode">
            {viewMode === 'desktop' ? (
                <Smartphone className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Monitor className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle view mode</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Εναλλαγή Προβολής σε {viewMode === 'desktop' ? 'Κινητό' : 'Desktop'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
