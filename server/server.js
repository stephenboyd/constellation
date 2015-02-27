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

