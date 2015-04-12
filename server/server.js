Meteor.publish("posts", function (author) {
  return Posts.find();
});

Meteor.users.deny({
  update: function() {
    return true;
  }
});

Meteor.publish("allUsers", function () {
  var selector = {};
  var options = {fields: { username: true, profile: true, image: true}};
  return Meteor.users.find(selector, options);
});

Meteor.publish("comments", function (postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish("postsByUser", function (usernameQuery) {
  check(usernameQuery, String);
  return Posts.find({username: usernameQuery});
});
