import { Models } from "node-appwrite";

import { PopulatedMember } from "@/features/members/types";
import { Project } from "@/features/projects/types";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE"
};

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  workspaceId: string;
  assigneeId: string;
  projectId: string;
  position: number;
  dueDate: Date | string;
  description?: string;
};

export type PopulatedTask = Task & {
  assignee: PopulatedMember;
  project: Project;
};