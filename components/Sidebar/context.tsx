'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarType {
    openMenus: Set<string>
    toggleOpen: (menu: string) => void
}

const SidebarContext = createContext<SidebarType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [openMenus, setOpen] = useState<Set<string>>(new Set())

    const toggleOpen = (menu: string) => {
        const newValue = new Set(openMenus)
        if (newValue.has(menu)) {
            newValue.delete(menu)
        } else {
            newValue.add(menu)
        }

        setOpen(newValue)
    }

    return (
        <SidebarContext.Provider value={{ openMenus, toggleOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider')
    }

    return context
}



export interface MenuItem {
  id: string
  label: string
  href: string
  onClick?: () => void
}
export interface MenuGroup {
  id: string
  label: string
  icon: string
  items: MenuItem[]
  onClick?: () => void
}
export interface MenuCategory {
  id: string
  label: string
  groups: MenuGroup[]
}
