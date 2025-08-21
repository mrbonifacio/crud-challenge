import { Suspense } from "react"
import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { PublicHeader } from "@/components/public-header"
import { PublicProjectsList } from "@/components/public-projects-list"
import { PublicProjectsFilters } from "@/components/public-projects-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CACHE_TAGS } from "@/lib/cache"

interface SearchParams {
  search?: string
}

const getCachedPublicProjects = unstable_cache(
  async (searchParams: SearchParams) => {
    const { search } = searchParams

    const where: any = { isPublic: true }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    return prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
  ["public-projects"],
  {
    tags: [CACHE_TAGS.PUBLIC_PROJECTS],
    revalidate: 1800, // 30 minutes
  },
)

async function getPublicProjects(searchParams: SearchParams) {
  return getCachedPublicProjects(searchParams)
}

export default async function PublicProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Public Projects</h1>
            <p className="text-muted-foreground text-lg">Discover amazing projects shared by our community</p>
          </div>

          <PublicProjectsFilters />

          <Suspense fallback={<PublicProjectsListSkeleton />}>
            <PublicProjectsListWrapper searchParams={params} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

async function PublicProjectsListWrapper({ searchParams }: { searchParams: SearchParams }) {
  const projects = await getPublicProjects(searchParams)
  return <PublicProjectsList projects={projects} />
}

function PublicProjectsListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
