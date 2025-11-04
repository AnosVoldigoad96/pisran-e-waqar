"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"

  if (!mounted) {
    return (
      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors">
        <div className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-background shadow-lg transition-transform" />
      </div>
    )
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        isDark ? "bg-secondary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform duration-200 ease-in-out",
          isDark ? "translate-x-6" : "translate-x-1"
        )}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          {isDark ? (
            <Moon className="h-2.5 w-2.5 text-secondary-foreground" />
          ) : (
            <Sun className="h-2.5 w-2.5 text-muted-foreground" />
          )}
        </span>
      </span>
    </button>
  )
}

