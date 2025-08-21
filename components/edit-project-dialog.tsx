"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { updateProject } from "@/app/actions/projects"
import { Edit } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string | null
  isPublic: boolean
}

interface EditProjectDialogProps {
  project: Project
}

export function EditProjectDialog({ project }: EditProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await updateProject(project.id, formData)
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
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
          <Edit className="h-3 w-3" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project.title}
              placeholder="Enter project title"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project.description || ""}
              placeholder="Enter project description"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isPublic" name="isPublic" defaultChecked={project.isPublic} disabled={isLoading} />
            <Label htmlFor="isPublic" className="text-sm">
              Make this project public
            </Label>
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
