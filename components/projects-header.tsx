import { LogoutButton } from "@/components/logout-button"
import { CreateProjectDialog } from "@/components/create-project-dialog"
import type { User } from "@/lib/auth"

interface ProjectsHeaderProps {
  user: User
}

export function ProjectsHeader({ user }: ProjectsHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-card-foreground">Project Manager</h2>
          </div>

          <div className="flex items-center gap-4">
            <CreateProjectDialog />

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-card-foreground">{user.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
