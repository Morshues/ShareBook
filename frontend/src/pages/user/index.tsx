import '../../app/globals.css'
import { useSession, signIn, signOut } from "next-auth/react";

export default function User() {
  const { status } = useSession();

  if (status !== "authenticated") {
    return <a href="/api/auth/signin">Sign in</a>
  }

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
