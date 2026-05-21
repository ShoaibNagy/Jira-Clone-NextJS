"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$patch"]>;
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$patch"], 200>;
type JsonRequestType = RequestType["form"];

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<
    ResponseType,
    Error,
    { form: JsonRequestType, param: RequestType["param"] },
    string
  >({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({ form, param });
      if(!response.ok) throw new Error("Failed to update the workspace");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspaces updated");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update a workspace");
    }
  });

  return mutation;
}