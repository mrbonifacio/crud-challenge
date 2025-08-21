import { PublicHeader } from "@/components/public-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Project Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The project you're looking for doesn't exist or is not publicly available.
              </p>
              <Button asChild className="bg-transparent">
                <Link href="/projects" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Public Projects
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
