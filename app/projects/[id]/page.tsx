import { notFound } from "next/navigation"
import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import Link from "next/link"
import { CACHE_TAGS } from "@/lib/cache"

const getCachedPublicProject = unstable_cache(
  async (id: string) => {
    return prisma.project.findFirst({
      where: {
        id,
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
  },
  ["project-details"],
  {
    tags: [CACHE_TAGS.PROJECT_DETAILS],
    revalidate: 3600, // 1 hour
  },
)

async function getPublicProject(id: string) {
  return getCachedPublicProject(id)
}

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getPublicProject(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.user.name || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created {format(new Date(project.createdAt), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="default">Public</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="prose prose-sm max-w-none">
                  {project.description ? (
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{project.description}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No description provided</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Project Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                    <p className="text-sm">{format(new Date(project.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                    <p className="text-sm">{formatDistanceToNow(new Date(project.updatedAt))} ago</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Author</p>
                    <p className="text-sm">{project.user.name || "Anonymous"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Visibility</p>
                    <Badge variant="default" className="text-xs">
                      Public
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
