import { getCurrent } from "@/features/auth/queries";
import SignInCard from "@/features/auth/components/SignInCard";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrent();

  if(user) redirect("/");

  return <SignInCard />
}