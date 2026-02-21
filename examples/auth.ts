/**
 * Auth Example — @sylphx/sdk
 *
 * User authentication with OAuth, magic links, and sessions.
 * Server-side and React hooks both supported.
 *
 * Docs: https://sylphx.com/docs/auth
 */

import {
  createConfig,
  signIn,
  signUp,
  signOut,
  getUser,
  sendMagicLink,
  getOAuthUrl,
} from "@sylphx/sdk";

const config = createConfig({
  secretKey: process.env.SYLPHX_APP_SECRET!,
});

// ──────────────────────────────────────────────
// Email + password sign-in
// ──────────────────────────────────────────────

async function emailSignIn(email: string, password: string) {
  const { user, token } = await signIn(config, { email, password });
  console.log("Signed in:", user.id);
  return { user, token };
}

// ──────────────────────────────────────────────
// Sign up a new user
// ──────────────────────────────────────────────

async function register(email: string, password: string) {
  const { user, token } = await signUp(config, {
    email,
    password,
    name: "Jane Doe",
  });
  console.log("New user:", user.id);
  return { user, token };
}

// ──────────────────────────────────────────────
// Magic link (passwordless)
// ──────────────────────────────────────────────

async function magicLink(email: string) {
  await sendMagicLink(config, {
    email,
    redirectTo: "https://myapp.com/dashboard",
  });
  console.log("Magic link sent to:", email);
}

// ──────────────────────────────────────────────
// OAuth (Google, GitHub, etc.)
// ──────────────────────────────────────────────

async function googleOAuth() {
  const url = await getOAuthUrl(config, {
    provider: "google",
    redirectTo: "https://myapp.com/auth/callback",
  });
  // Redirect the user to `url`
  return url;
}

// ──────────────────────────────────────────────
// Get current user from token
// ──────────────────────────────────────────────

async function currentUser(token: string) {
  const user = await getUser(config, { token });
  console.log("User:", user.email);
  return user;
}

// ──────────────────────────────────────────────
// React hooks (client-side)
// ──────────────────────────────────────────────

// import { useAuth, useUser } from '@sylphx/sdk/react'
//
// export function ProfileButton() {
//   const { user, isLoaded } = useUser()
//   const { signOut } = useAuth()
//
//   if (!isLoaded) return <Spinner />
//   if (!user) return <Link href="/sign-in">Sign in</Link>
//
//   return (
//     <div>
//       <span>{user.email}</span>
//       <button onClick={signOut}>Sign out</button>
//     </div>
//   )
// }
