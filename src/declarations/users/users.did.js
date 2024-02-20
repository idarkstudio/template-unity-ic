export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const User = IDL.Record({
    'alias' : IDL.Text,
    'urlImage' : IDL.Text,
    'principalId' : IDL.Principal,
  });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  return IDL.Service({
    'SetAlias' : IDL.Func([IDL.Principal, IDL.Text], [Result_1], []),
    'createUser' : IDL.Func([IDL.Principal], [Result], []),
    'findOrCreateUser' : IDL.Func([IDL.Principal], [User], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getUser' : IDL.Func([IDL.Principal], [Result], ['query']),
    'getUserByAlias' : IDL.Func([IDL.Text], [Result], ['query']),
    'totalUsers' : IDL.Func([], [IDL.Nat], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
