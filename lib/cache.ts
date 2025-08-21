// Cache tags for different data types
export const CACHE_TAGS = {
  USER_PROJECTS: "user-projects",
  PUBLIC_PROJECTS: "public-projects",
  PROJECT_DETAILS: "project-details",
  USER_SESSION: "user-session",
} as const

// Helper function to generate project-specific cache tags
export function getProjectCacheTag(projectId: string) {
  return `project-${projectId}`
}

// Helper function to generate user-specific cache tags
export function getUserProjectsCacheTag(userId: string) {
  return `user-${userId}-projects`
}
