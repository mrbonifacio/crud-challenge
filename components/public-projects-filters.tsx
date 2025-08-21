"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function PublicProjectsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") || ""

  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`?${params.toString()}`)
  }

  function clearSearch() {
    router.push("/projects")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
      <div className="relative max-w-md mx-auto md:mx-0">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search public projects..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          className="pl-9 w-full md:w-80"
        />
      </div>

      {search && (
        <Button variant="outline" onClick={clearSearch} className="flex items-center gap-2 bg-transparent">
          <X className="h-4 w-4" />
          Clear Search
        </Button>
      )}
    </div>
  )
}
