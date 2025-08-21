"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function ProjectsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""
  const visibility = searchParams.get("visibility") || "all"

  function updateFilters(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`?${params.toString()}`)
  }

  function clearFilters() {
    router.push("/app/projects")
  }

  const hasFilters = search || visibility !== "all"

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => updateFilters({ search: e.target.value || null })}
          className="pl-9"
        />
      </div>

      <Select
        value={visibility}
        onValueChange={(value) => updateFilters({ visibility: value === "all" ? null : value })}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="public">Public Only</SelectItem>
          <SelectItem value="private">Private Only</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2 bg-transparent">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
