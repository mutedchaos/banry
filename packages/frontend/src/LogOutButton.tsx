import { logout } from './session'
import { Button } from './styles/Button'

export function LogOutButton() {
  return <Button onClick={logout}>Log out</Button>
}
