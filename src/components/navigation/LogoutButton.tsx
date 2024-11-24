import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { clearUser } from "@/store/user/userSlice"

type Props = {
  close?: () => void
}

const LogoutButton = ({ close }: Props) => {
  const { logout } = useAuth0()
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
    dispatch(clearUser())
    if (close) close()
  }

  return (
    <Button className="font-medium w-full" onClick={handleLogout}>
      Log Out
    </Button>

  )
}

export default LogoutButton