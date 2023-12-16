// hooks/useRequireAuth.js
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function useRequireAuth(redirectTo = "/") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push(redirectTo); // Redirect to dashboard if not logged in
  }, [session, status, router, redirectTo]);

  return session;
}
