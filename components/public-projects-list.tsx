import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { Eye, User } from "lucide-react"
import Link from "next/link"

interface PublicProject {
  id: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  user: {
    name: string | null
    email: string
  }
}

interface PublicProjectsListProps {
  projects: PublicProject[]
}

export function PublicProjectsList({ projects }: PublicProjectsListProps) {
  if (projects.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">No public projects found. Try adjusting your search.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
              <Badge variant="default">Public</Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{project.user.name || "Anonymous"}</span>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {project.description || "No description provided"}
            </p>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
            </p>

            <Button asChild size="sm" className="flex items-center gap-1">
              <Link href={`/projects/${project.id}`}>
                <Eye className="h-3 w-3" />
                View
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
