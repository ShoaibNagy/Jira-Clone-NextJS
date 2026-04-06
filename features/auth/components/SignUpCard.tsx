import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpCard() {
  return (
    <Card className="w-full h-full md:w-121.5 border-none shadow-none">
      <CardHeader className="flex flex-col  items-center justify-center text-center p-7">
        <CardTitle className="flex text-2xl">
          Create an Account!
        </CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href={"/privacy-policy"}>
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}and{" "}
          <Link href={"/terms-of-service"}>
            <span className="text-blue-700">Terms of Service</span>
          </Link>.
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="text"
            value={""}
            onChange={() => { }}
            placeholder="Full Name"
            disabled={false}
          />
          <Input
            required
            type="email"
            value={""}
            onChange={() => { }}
            placeholder="Email Address"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => { }}
            placeholder="Password"
            disabled={false}
            min={8}
            max={256}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => { }}
            placeholder="Confirm Password"
            disabled={false}
            min={8}
            max={256}
          />
          <Button disabled={false} size={"lg"} className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}