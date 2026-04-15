import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono/client";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type JsonRequestType = RequestType["json"];

export function useLogin() {
  const mutation = useMutation<
    ResponseType,
    Error,
    { json: JsonRequestType },
    string
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      return await response.json();
    },
  });

  return mutation;
}