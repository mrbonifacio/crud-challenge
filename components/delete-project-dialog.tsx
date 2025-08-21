"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteProject } from "@/app/actions/projects"
import { Trash2 } from "lucide-react"

interface DeleteProjectDialogProps {
  projectId: string
  projectTitle: string
}

export function DeleteProjectDialog({ projectId, projectTitle }: DeleteProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setIsLoading(true)
    setError(null)

    try {
      const result = await deleteProject(projectId)
      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 text-destructive hover:text-destructive bg-transparent"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{projectTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
