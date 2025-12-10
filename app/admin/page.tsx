"use client"

import { useEffect, useState } from "react"
import AdminDashboard from "@/components/admin/dashboard"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "taco-admin"
const TOKEN_STORAGE_KEY = "taco-shop-menu-token"
const AUTH_COOKIE_KEY = "taco-shop-admin-session"
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [error, setError] = useState("")
  const [githubToken, setGithubToken] = useState("")
  const [rememberToken, setRememberToken] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const savedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY)
    if (savedToken) {
      setGithubToken(savedToken)
      setRememberToken(true)
    }
    if (hasAuthCookie()) {
      setIsAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return
    document.body.classList.add("admin-shell")
    return () => {
      document.body.classList.remove("admin-shell")
    }
  }, [])

  const persistToken = (token: string, remember: boolean) => {
    if (typeof window === "undefined") return
    if (remember && token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  }

  const handleSignOut = () => {
    setIsAuthed(false)
    setPassword("")
    setError("")
    clearAuthCookie()
    if (!rememberToken) {
      setGithubToken("")
      persistToken("", false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!githubToken) {
      setError("GitHub token is required to manage the menu.")
      return
    }
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true)
      setError("")
      persistToken(githubToken, rememberToken)
      setAuthCookie()
    } else {
      setError("Incorrect password")
    }
  }

  const handleTokenChange = (value: string) => {
    setGithubToken(value)
    if (rememberToken) {
      persistToken(value, true)
    }
  }

  const handleRememberToggle = () => {
    const next = !rememberToken
    setRememberToken(next)
    persistToken(githubToken, next)
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light px-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-semibold text-center text-dark">Admin Sign In</h1>
          <p className="text-sm text-dark/70 text-center">
            Enter the admin password and a GitHub token (repo contents:write) to manage the Taco Shop menu.
          </p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-dark/20 p-3"
            placeholder="Password"
            autoComplete="current-password"
          />
          <input
            type="password"
            value={githubToken}
            onChange={(event) => handleTokenChange(event.target.value)}
            className="w-full rounded-lg border border-dark/20 p-3"
            placeholder="GitHub Personal Access Token"
          />
          <label className="flex items-center gap-2 text-sm text-dark/80">
            <input type="checkbox" checked={rememberToken} onChange={handleRememberToggle} />
            Remember token on this device
          </label>
          <p className="text-xs text-dark/60">
            Tip: generate a fine-grained token limited to this repository with contents:write scope.
          </p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full bg-coral text-white py-3 rounded-lg font-medium">
            Enter
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light pb-10 admin-shell">
      <AdminDashboard
        githubToken={githubToken}
        onGithubTokenChange={handleTokenChange}
        rememberToken={rememberToken}
        onRememberTokenChange={handleRememberToggle}
        onSignOut={handleSignOut}
      />
    </div>
  )
}

function hasAuthCookie() {
  if (typeof document === "undefined") return false
  return document.cookie.split("; ").some((entry) => entry.startsWith(`${AUTH_COOKIE_KEY}=`))
}

function setAuthCookie() {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=${AUTH_COOKIE_MAX_AGE}`
}

function clearAuthCookie() {
  if (typeof document === "undefined") return
  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0`
}
