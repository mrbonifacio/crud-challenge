import { unstable_cache } from "next/cache"
import { prisma } from "./prisma"
import { CACHE_TAGS } from "./cache"

export const getCachedProjectCount = unstable_cache(
  async (userId?: string) => {
    if (userId) {
      return prisma.project.count({
        where: { userId },
      })
    }
    return prisma.project.count({
      where: { isPublic: true },
    })
  },
  ["project-count"],
  {
    tags: [CACHE_TAGS.USER_PROJECTS, CACHE_TAGS.PUBLIC_PROJECTS],
    revalidate: 3600, // 1 hour
  },
)

export const getCachedUserStats = unstable_cache(
  async (userId: string) => {
    const [totalProjects, publicProjects, privateProjects] = await Promise.all([
      prisma.project.count({ where: { userId } }),
      prisma.project.count({ where: { userId, isPublic: true } }),
      prisma.project.count({ where: { userId, isPublic: false } }),
    ])

    return {
      totalProjects,
      publicProjects,
      privateProjects,
    }
  },
  ["user-stats"],
  {
    tags: [CACHE_TAGS.USER_PROJECTS],
    revalidate: 3600, // 1 hour
  },
)
