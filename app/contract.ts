import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const HyperNodeContractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const contract = getContract({
  client: client,
  chain: sepolia,
  address: HyperNodeContractAddress,
});
