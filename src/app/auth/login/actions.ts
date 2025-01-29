"use server";

import { Routes } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const loginWithGoogle = async () => {
  const headerList = (await headers())
  const origin = headerList.get("origin") || headerList.get("referer");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin ?? ""}${Routes.API_AUTH_CALLBACK}`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
};