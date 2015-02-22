Meteor.publish("posts", function () {
  return Posts.find();
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});
