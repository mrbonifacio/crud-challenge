import { Button } from "@/components/ui/button"
import { logoutAction } from "@/app/actions/auth"

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="outline" type="submit">
        Sign Out
      </Button>
    </form>
  )
}
