"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { EditTaskFormWrapper } from "./EditTaskFormWrapper";

import { useUpdateTaskModal } from "../hooks/useUpdateTaskModal";

export const EditTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && (
        <EditTaskFormWrapper id={taskId} onCancel={close} />
      )}
    </ResponsiveModal>
  );
};