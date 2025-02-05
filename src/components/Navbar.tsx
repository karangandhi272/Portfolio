import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Home, 
  FolderGit2, 
  User, 
  Menu, 
  ChevronLeft 
} from "lucide-react"

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsExpanded(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationItems = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/projects", icon: <FolderGit2 size={20} />, label: "Projects" },
  ]

  // Mobile bottom navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 z-50">
        <div className="flex justify-around items-center h-full px-4">
          {navigationItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center gap-1 w-16 h-full",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    )
  }

  // Desktop sidebar navigation
  return (
    <nav className={cn(
      "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-screen fixed left-0 top-0 bottom-0 bg-background border-r transition-all duration-300 hidden md:block",
      isExpanded ? "w-64" : "w-20"
    )}>
      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center mb-8">
          {isExpanded && (
            <NavLink to="/">
              <Button variant="ghost" className="text-xl font-bold">
                Karan Gandhi
              </Button>
            </NavLink>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeft /> : <Menu />}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              {item.icon}
              {isExpanded && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}