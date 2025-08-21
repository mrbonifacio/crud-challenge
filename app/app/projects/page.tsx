import { Suspense } from "react"
import { unstable_cache } from "next/cache"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProjectsHeader } from "@/components/projects-header"
import { ProjectsList } from "@/components/projects-list"
import { ProjectsFilters } from "@/components/projects-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CACHE_TAGS } from "@/lib/cache"

interface SearchParams {
  search?: string
  visibility?: "all" | "public" | "private"
}

const getCachedUserProjects = unstable_cache(
  async (userId: string, searchParams: SearchParams) => {
    const { search, visibility } = searchParams

    const where: any = { userId }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (visibility === "public") {
      where.isPublic = true
    } else if (visibility === "private") {
      where.isPublic = false
    }

    return prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  },
  ["user-projects"],
  {
    tags: [CACHE_TAGS.USER_PROJECTS],
    revalidate: 3600, // 1 hour
  },
)

async function getProjects(userId: string, searchParams: SearchParams) {
  return getCachedUserProjects(userId, searchParams)
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const session = await getSession()
  const params = await searchParams

  if (!session) {
    return null // Middleware will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <ProjectsHeader user={session} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Projects</h1>
              <p className="text-muted-foreground">Manage and organize your projects</p>
            </div>
          </div>

          <ProjectsFilters />

          <Suspense fallback={<ProjectsListSkeleton />}>
            <ProjectsListWrapper userId={session.id} searchParams={params} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

async function ProjectsListWrapper({ userId, searchParams }: { userId: string; searchParams: SearchParams }) {
  const projects = await getProjects(userId, searchParams)
  return <ProjectsList projects={projects} />
}

function ProjectsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
