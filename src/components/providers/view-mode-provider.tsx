"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type ViewMode = "desktop" | "mobile"

type ViewModeProviderProps = {
  children: React.ReactNode
  defaultMode?: ViewMode
  storageKey?: string
}

type ViewModeProviderState = {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  toggleViewMode: () => void
  isMounted: boolean
}

const initialState: ViewModeProviderState = {
  viewMode: "desktop",
  setViewMode: () => null,
  toggleViewMode: () => null,
  isMounted: false,
}

const ViewModeProviderContext = createContext<ViewModeProviderState>(initialState)

export function ViewModeProvider({
  children,
  defaultMode = "desktop",
  storageKey = "ui-view-mode",
  ...props
}: ViewModeProviderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedMode = localStorage.getItem(storageKey) as ViewMode | null;
    if (storedMode) {
        setViewMode(storedMode);
    }
  }, [storageKey]);
  
  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement
      
      root.classList.remove("desktop-view", "mobile-view")
      root.classList.add(`${viewMode}-view`)

      localStorage.setItem(storageKey, viewMode)
    }
  }, [viewMode, storageKey, isMounted])

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'desktop' ? 'mobile' : 'desktop'));
  };
  
  const value = {
    viewMode: isMounted ? viewMode : defaultMode,
    setViewMode,
    toggleViewMode,
    isMounted,
  }

  return (
    <ViewModeProviderContext.Provider {...props} value={value}>
      {children}
    </ViewModeProviderContext.Provider>
  )
}

export const useViewMode = () => {
  const context = useContext(ViewModeProviderContext)

  if (context === undefined)
    throw new Error("useViewMode must be used within a ViewModeProvider")

  return context
}
