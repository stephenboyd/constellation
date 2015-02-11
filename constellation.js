Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Template.body.helpers({
    posts: function () {
      return Posts.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-post": function (event) {
      var text = event.target.text.value;
      Meteor.call("addPost", text);
      event.target.text.value = "";
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.post.events({
    "click .delete": function () {
      Meteor.call("deletePost", this._id);
    }
  });

  Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
