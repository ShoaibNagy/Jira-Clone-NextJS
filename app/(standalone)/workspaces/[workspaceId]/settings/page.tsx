import { getCurrent } from "@/features/auth/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/UpdateWorkspaceForm";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
};

export default async function WorkspaceIdSettingsPage({
  params
}: WorkspaceIdSettingsPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });
  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`)

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
}