Posts = new Mongo.Collection("posts");

if (Meteor.isServer) {
  Meteor.publish("posts", function () {
    return Posts.find();
  });
}
