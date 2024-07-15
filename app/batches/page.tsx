"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

function Batches({}: Props) {
  const [batches, setBatches] = useState<any>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/batch/`).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setBatches(data);
      });
    });
  }, []);
  return (
    <div className="w-full h-screen p-8">
      <Link className="text-xl " href={"/purchase"}>
        <Button>Back</Button>
      </Link>
      <div className="flex w-full justify-center mt-4">
        <div className="flex flex-wrap-reverse gap-6">
          {batches.length > 0 &&
            batches.map((batch: any) => (
              <div
                className="border bg-neutral-900 rounded p-2 flex flex-col items-center text-center"
                key={batch.batchNumber}
                style={
                  batch.filled
                    ? { border: "2px solid green" }
                    : { border: "2px solid orange" }
                }
              >
                <div>
                  Batch {batch.batchNumber} -{" "}
                  {batch.filled ? "Filled" : "Not filled"}
                </div>
                <div>
                  Fractions: {batch.fractions.length}
                  <div className="flex mt-2 flex-wrap ">
                    {batch.fractions.map((fraction: any) => (
                      <div key={fraction.tokenId} className="w-1/3 p-2">
                        <div className="flex border border-gray-200 border-dashed p-4 flex-col">
                          <p>
                            TokenId:{" "}
                            <span className="text-xs  text-gray-400">
                              {" "}
                              {fraction.tokenId}
                            </span>
                          </p>
                          <p>
                            Owner:{" "}
                            <span className="text-xs  text-gray-400">
                              {fraction.owner}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>{" "}
      </div>
    </div>
  );
}

export default Batches;
