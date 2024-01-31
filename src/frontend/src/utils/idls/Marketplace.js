export default ({ IDL }) => {
  const Result_4 = IDL.Variant({ ok: IDL.Bool, err: IDL.Text });
  const TokenId = IDL.Nat64;
  const Nft = IDL.Record({
    id: TokenId,
    owner: IDL.Principal,
    metadata: IDL.Text,
  });
  const MintReceiptPart = IDL.Record({
    id: IDL.Nat,
    token_id: TokenId,
    list: IDL.Opt(IDL.Vec(Nft)),
  });
  const ApiError = IDL.Variant({
    ZeroAddress: IDL.Null,
    InvalidTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    Other: IDL.Null,
  });
  const MintReceipt = IDL.Variant({ Ok: MintReceiptPart, Err: ApiError });
  const Result_3 = IDL.Variant({ ok: MintReceipt, err: IDL.Text });
  const Result_2 = IDL.Variant({ ok: IDL.Principal, err: IDL.Text });
  const MetadataDesc = IDL.Text;
  const LogoResult = IDL.Record({ data: IDL.Text, logo_type: IDL.Text });
  const ResponseData = IDL.Record({
    metadata: MetadataDesc,
    logo: LogoResult,
    name: IDL.Text,
    description: IDL.Text,
    price: IDL.Nat,
    priceBTC: IDL.Nat,
    priceICP: IDL.Nat,
    principalId: IDL.Principal,
    symbol: IDL.Text,
  });
  const Result_1 = IDL.Variant({ ok: MetadataDesc, err: ApiError });
  const OwnerResult = IDL.Variant({ Ok: IDL.Principal, Err: ApiError });
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
  return IDL.Service({
    addContractOwner: IDL.Func([IDL.Principal], [Result_4], []),
    buy: IDL.Func([IDL.Principal, IDL.Principal, IDL.Text], [Result_3], []),
    createNft: IDL.Func(
      [
        IDL.Principal,
        IDL.Text,
        IDL.Text,
        IDL.Text,
        IDL.Text,
        IDL.Text,
        IDL.Nat16,
        IDL.Nat,
        IDL.Nat,
        IDL.Nat,
        IDL.Text,
      ],
      [Result_2],
      []
    ),
    getAllNfts: IDL.Func([], [IDL.Vec(ResponseData)], []),
    getContractOwners: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getNftByName: IDL.Func([IDL.Principal, IDL.Text], [Result_1], []),
    getNftsByOwner: IDL.Func(
      [IDL.Principal],
      [
        IDL.Vec(
          IDL.Record({
            id: TokenId,
            owner: OwnerResult,
            logo: LogoResult,
            name: IDL.Text,
            symbol: IDL.Text,
          })
        ),
      ],
      []
    ),
    getPrincipalsNft: IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    withdrawTreasure: IDL.Func([], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
