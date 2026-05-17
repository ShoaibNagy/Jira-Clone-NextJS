import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  
  return (
    <div>
      <h1>Workspace Page</h1>
    </div>
  );
}