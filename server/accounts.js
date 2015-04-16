Accounts.onCreateUser(function(options, user) {
  user.following = [];
  return user;
});
