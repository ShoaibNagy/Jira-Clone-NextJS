import { getCurrent } from "@/features/auth/actions";
import SignUpCard from "@/features/auth/components/SignUpCard";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getCurrent();

  if(user) redirect("/sign-in");
  
  return <SignUpCard />
}