"use server"

import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { CACHE_TAGS, getProjectCacheTag, getUserProjectsCacheTag } from "@/lib/cache"

export async function createProject(formData: FormData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isPublic = formData.get("isPublic") === "on"

  if (!title) {
    return { error: "Title is required" }
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        isPublic,
        userId: session.id,
      },
    })

    revalidateTag(CACHE_TAGS.USER_PROJECTS)
    revalidateTag(getUserProjectsCacheTag(session.id))
    if (isPublic) {
      revalidateTag(CACHE_TAGS.PUBLIC_PROJECTS)
    }

    return { success: true }
  } catch (error) {
    console.error("Create project error:", error)
    return { error: "Failed to create project" }
  }
}

export async function updateProject(projectId: string, formData: FormData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isPublic = formData.get("isPublic") === "on"

  if (!title) {
    return { error: "Title is required" }
  }

  try {
    // Verify ownership
    const existingProject = await prisma.project.findFirst({
      where: { id: projectId, userId: session.id },
    })

    if (!existingProject) {
      return { error: "Project not found or access denied" }
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description: description || null,
        isPublic,
      },
    })

    revalidateTag(CACHE_TAGS.USER_PROJECTS)
    revalidateTag(getUserProjectsCacheTag(session.id))
    revalidateTag(getProjectCacheTag(projectId))
    revalidateTag(CACHE_TAGS.PROJECT_DETAILS)

    // Revalidate public projects if visibility changed
    if (existingProject.isPublic !== isPublic) {
      revalidateTag(CACHE_TAGS.PUBLIC_PROJECTS)
    }

    return { success: true }
  } catch (error) {
    console.error("Update project error:", error)
    return { error: "Failed to update project" }
  }
}

export async function deleteProject(projectId: string) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  try {
    // Verify ownership
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: session.id },
    })

    if (!project) {
      return { error: "Project not found or access denied" }
    }

    await prisma.project.delete({
      where: { id: projectId },
    })

    revalidateTag(CACHE_TAGS.USER_PROJECTS)
    revalidateTag(getUserProjectsCacheTag(session.id))
    revalidateTag(getProjectCacheTag(projectId))
    revalidateTag(CACHE_TAGS.PROJECT_DETAILS)
    if (project.isPublic) {
      revalidateTag(CACHE_TAGS.PUBLIC_PROJECTS)
    }

    return { success: true }
  } catch (error) {
    console.error("Delete project error:", error)
    return { error: "Failed to delete project" }
  }
}
