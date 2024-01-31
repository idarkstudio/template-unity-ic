export default ({ IDL }) => {
  const User = IDL.Record({
    alias: IDL.Text,
    urlImage: IDL.Text,
    principalId: IDL.Principal,
  });
  const Result = IDL.Variant({ ok: User, err: IDL.Text });
  return IDL.Service({
    createUser: IDL.Func([IDL.Principal], [Result], []),
    findOrCreateUser: IDL.Func([IDL.Principal], [User], []),
    getAllUsers: IDL.Func([], [IDL.Vec(User)], ["query"]),
    getUser: IDL.Func([IDL.Principal], [Result], ["query"]),
    getUserByAlias: IDL.Func([IDL.Text], [Result], ["query"]),
    totalUsers: IDL.Func([], [IDL.Nat], ["query"]),
  });
};
export const init = ({ IDL }) => {
  return [];
};
