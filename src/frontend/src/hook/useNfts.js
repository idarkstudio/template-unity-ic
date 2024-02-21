import { p, principalToAccount } from "../utils/functions";

import { useCanister } from "@connect2ic/react";

const useNfts = () => {
  const [genesis] = useCanister("genesis", { mode: "anonymous" });

  const allNfts = async (isConnected, principal) => {
    console.log({ isConnected, principal });

    if (!isConnected || !principal) return [];
  
    const genesis = await getGenesisNFTs(principal);
    const all = [...genesis]; 
    return all;

  };

  

  const getGenesisNFTs = async (principal) => {
    console.log("entra getGenesisNFTs");

    try {
      const registry = await genesis.getRegistry();
      console.log({ registry });

      // TODO principal
      const tokensId = registry
        .filter(
          (a) =>
            a[1] ===
            principalToAccount(principal)
        )
        .map((a) => a[0]);
      console.log({ tokensId });

      const exts = await genesis.getTokensByIds(tokensId);
      console.log({ exts });

      const data = exts.map((arr) => ({
        token_id: arr[0],
        ...JSON.parse(String.fromCharCode(...arr[1]?.nonfungible?.metadata?.[0])),
      }));
      console.log({ data });

      return data?.length > 0
        ? data.map((nft) => ({
            image: nft.thumb,
            name: nft.name,
            description: nft.description,
            collection: "The Genesis Collection",
          }))
        : [];
    } catch (err) {
      console.log("get genesis nfts error:", err);
      return [];
    }
  };

  return { allNfts };
};

export default useNfts;
