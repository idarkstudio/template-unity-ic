import { p, principalToAccount } from "../utils/functions";

import { useCanister } from "@connect2ic/react";

const useNfts = () => {
  const [baby_dragon] = useCanister("baby_dragon", { mode: "anonymous" });
  const [genesis] = useCanister("genesis", { mode: "anonymous" });
  const [purple_legion] = useCanister("purple_legion", { mode: "anonymous" });

  const allNfts = async (isConnected, principal) => {
    console.log({ isConnected, principal });

    if (!isConnected || !principal) return [];
    console.log("entra allNfts");

    // try {
    const baby = await getBabyDragonNFTs();
    const genesis = await getGenesisNFTs(principal);
    const purple = await getPurpleLegionNFTs(principal);
    // const hallow = await getHallowEndNFTs();
    const all = [...baby, ...genesis, ...purple]; // ...hallow];
    console.log({ all });
    return all;
    // } catch (err) {
    //   console.log("all nfts error:", err);
    //   return [];
    // }
  };

  const getBabyDragonNFTs = async () => {
    console.log("entra getBabyDragonNFTs");
    try {
      // TODO principal
      const nfts = await baby_dragon.getNftsByOwner(
        p("5rox3-2lzcj-ewexj-ke3yg-ue5zm-kz52u-xbznr-w4tjq-uo6ms-cmhql-7ae")
      );
      console.log({ nfts });

      return nfts?.length > 0
        ? nfts.map((nft) => ({
            image: nft.logo,
            name: nft.name,
            description: nft.description,
            collection: "Origyn Baby Dragon",
          }))
        : [];
    } catch (err) {
      console.log("get baby dragon nfts error:", err);
      return [];
    }
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
            principalToAccount("zxcjx-7yvay-ow7hh-nbocq-5aaru-n7nwq-xyhau-jnr6m-f36ho-xzufk-rae")
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

  const getPurpleLegionNFTs = async (principal) => {
    console.log("entra getPurpleLegionNFTs");

    try {
      const registry = await purple_legion.getRegistry();
      console.log({ registry });

      // TODO principal
      const tokensId = registry
        .filter(
          (a) =>
            a[1] ===
            principalToAccount("fvt6t-aek2o-36wpd-jnuff-iqfip-bs6ty-uatmz-njj6b-jboqx-okrnr-fae")
        )
        .map((a) => a[0]);
      console.log({ tokensId });

      const exts = await purple_legion.getTokensByIds(tokensId);
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
            collection: "Purple's Legion",
          }))
        : [];
    } catch (err) {
      console.log("get purples nfts error:", err);
      return [];
    }
  };

  const getHallowEndNFTs = async (principal) => {
    console.log("entra getHallowEndNFTs");

    try {
      const registry = await purple_legion.getRegistry();
      console.log({ registry });

      // TODO principal
      const tokensId = registry
        .filter(
          (a) =>
            a[1] ===
            principalToAccount("yjggg-oc6co-puvcs-urno6-n7tor-i6b7z-t4flj-brreo-6zify-j2zd6-jqe")
        )
        .map((a) => a[0]);
      console.log({ tokensId });

      const exts = await purple_legion.getTokensByIds(tokensId);
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
            collection: "Hallow's End",
          }))
        : [];
    } catch (err) {
      console.log("get hallow end nfts error:", err);
      return [];
    }
  };

  return { allNfts };
};

export default useNfts;
