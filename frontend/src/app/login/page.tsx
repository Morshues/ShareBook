import '@/styles/globals.css'
import { GOOGLE_AUTH_URL } from '@/constants';

export default function Login() {

  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        Log in with Google
      </a>
    </div>
  )
}