import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@/components/ui/button"

type Props = {
  close?: () => void
}

const LogoutButton = ({ close }: Props) => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    if (close) close()
  }

  return (
    <Button className="font-medium w-full" onClick={handleLogout}>
      Log Out
    </Button>

  )
}

export default LogoutButton