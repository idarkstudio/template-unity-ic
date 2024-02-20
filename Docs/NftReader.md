

### Introduction:
Firstly, it's important to note that NFTs don't follow the same standard. Therefore, we'll need two things: knowing the IDLs of the specific NFT and identifying which functions of the canister are relevant. To address both aspects, we will use ICSscan.

## Step 1:
Navigate to ICSscan and obtain the IDLs. Add them to the "idls" folder.

## Step 2:
Add our canister ID to the "canisters" file. In the "linked" object, include the IDLFactory with our IDLs file.

## Step 3

Utilize ICSscan to identify the functions within the IDLs that provide information about the NFTs owned by a principal. These functions will enable us to retrieve the NFTs owned by the principal. Once identified, implement these functions to populate our total array of NFTs, named "allNFT".

It's important to note that ICSscan will be instrumental in searching for and comprehending the relevant functions in the IDLs.

Additionally, within ![useNft.js](../src/frontend/src/hook/useNfts.js), by leveraging the functions from each canister (the ID of each NFT collection) and the user's principal, you should be able to access all the NFTs from that collection owned by the user. Subsequently, these NFTs should be appended to the 'All' array in 'useNfts'.
```js
 const useNfts = () => {
  const [genesis] = useCanister("genesis", { mode: "anonymous" });

  const allNfts = async (isConnected, principal) => {
    console.log({ isConnected, principal });

    if (!isConnected || !principal) return [];
  
    const genesis = await getGenesisNFTs(principal);
    const all = [...genesis]; 
    return all;

  };
```


for example if i want to know if a principal has the genesis collection I use :
```js
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
            principalToAccount(p(principal))
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
 ```
It is important that the NFT object is structured as follows:
 ```js
 const nft = {
    image: ,
    name: ,
    description: ,
    collection: ,
 }
 ```