import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-4">
      <Button variant={"primary"} size={"xs"}>Primary</Button>
      <Button variant={"secondary"} size={"sm"}>Secondary</Button>
      <Button variant={"destructive"} size={"sm"}>Destructive</Button>
      <Button variant={"ghost"} size={"sm"}>Ghost</Button>
      <Button variant={"muted"} size={"sm"}>Muted</Button>
      <Button variant={"outline"} size={"sm"}>Outline</Button>
      <Button variant={"tritary"} size={"sm"}>Tritary</Button>
    </div>

  );
}
