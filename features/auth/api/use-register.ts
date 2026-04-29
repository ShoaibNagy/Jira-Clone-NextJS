import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;
type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type JsonRequestType = RequestType["json"];

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const mutation = useMutation<
    ResponseType,
    Error,
    { json: JsonRequestType },
    string
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });
      if(!response.ok) throw new Error("Failed to register");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to register");
    }
  });

  return mutation;
}