import { Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Project } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getProjects = async () => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("userId", user.$id)]
    );

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [
        Query.orderDesc("$createdAt"),
        Query.contains("$id", workspaceIds)
      ]
    );

    return workspaces;
  } catch {
    return { documents: [], total: 0 };
  }
};

interface GetProjectProps {
  projectId: string;
};

export const getProject = async ({ projectId }: GetProjectProps) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId,
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId
    });

    if (!member) return null;

    return project;
  } catch {
    return null;
  }
};

interface GetProjectInfoProps {
  projectId: string;
};

export const getProjectInfo = async ({ projectId }: GetProjectInfoProps) => {
  try {
    const { databases } = await createSessionClient();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      WORKSPACES_ID,
      projectId
    );

    return { name: project.name };
  } catch {
    return null;
  }
};