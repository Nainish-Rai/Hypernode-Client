"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";

export default function Purchase() {
  const account = useActiveAccount();
  return (
    <main className="w-full h-screen flex py-16 flex-col gap-8 items-center">
      <h1 className="text-2xl">Buy 1/10 Fractionalized NFT</h1>
      <div className="mt-16 flex flex-col items-center gap-8">
        <Input
          type="email"
          className="p-12 rounded-xl "
          placeholder="Enter Quantity"
        />
        {account ? (
          <Button className="px-8">Purchase</Button>
        ) : (
          <ConnectButton client={client} />
        )}
        {account && <ConnectButton client={client} />}
      </div>
    </main>
  );
}
