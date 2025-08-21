import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditProjectDialog } from "@/components/edit-project-dialog"
import { DeleteProjectDialog } from "@/components/delete-project-dialog"
import { formatDistanceToNow } from "date-fns"

interface Project {
  id: string
  title: string
  description: string | null
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">No projects found. Create your first project to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
              <Badge variant={project.isPublic ? "default" : "secondary"}>
                {project.isPublic ? "Public" : "Private"}
              </Badge>
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

            <div className="flex gap-2">
              <EditProjectDialog project={project} />
              <DeleteProjectDialog projectId={project.id} projectTitle={project.title} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
