import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-center flex-col gap-8 items-center">
      <h1 className="text-5xl">Introducting HyperNode</h1>
      <Link href="/purchase">
        <Button className="px-16 rounded-full">Get Started</Button>
      </Link>
    </main>
  );
}
