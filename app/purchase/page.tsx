"use client";
import { Input } from "@/components/ui/input";
import {
  ConnectButton,
  useActiveAccount,
  TransactionButton,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "../client";
import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { contract } from "../contract";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Purchase() {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [quantity, setQuantity] = useState(0);

  const addFractionsToDatabase = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fractions/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
          walletAddress: account?.address,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Fractions added to DB");
      });
  };
  return (
    <main className="w-full h-screen flex py-16 flex-col gap-8 items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl">Buy 1/10 Fractionalized NFT</h1>
      <div className="mt-16 flex flex-col items-center gap-8">
        <Input
          type="number"
          className="p-12 rounded-xl "
          placeholder="Enter Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        {account ? (
          <TransactionButton
            disabled={quantity < 1}
            transaction={() => {
              // Create a transaction object and return it
              const tx = prepareContractCall({
                contract,
                method: "function purchaseFractions(uint256 quantity) payable",
                params: [BigInt(quantity)],
              });
              return tx;
            }}
            onTransactionSent={(result) => {
              console.log("Transaction submitted", result.transactionHash);
              toast.success("Transaction submitted");
            }}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
              toast.success("Transaction confirmed");
              addFractionsToDatabase();
            }}
            onError={(error) => {
              console.error("Transaction error", error);
            }}
          >
            Purchase
          </TransactionButton>
        ) : (
          <ConnectButton client={client} />
        )}
        <Link href="/batches">
          <Button className="px-16 rounded-full">View Batches</Button>
        </Link>
        {account && <ConnectButton client={client} />}
      </div>
    </main>
  );
}
