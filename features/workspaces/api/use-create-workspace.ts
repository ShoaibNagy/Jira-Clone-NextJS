"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
type JsonRequestType = RequestType["json"];

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<
    ResponseType,
    Error,
    { json: JsonRequestType },
    string
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces["$post"]({ json });
      if(!response.ok) throw new Error("Failed to create a workspace");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspaces created");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Failed to create a workspace");
    }
  });

  return mutation;
}