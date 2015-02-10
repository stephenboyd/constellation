if (Meteor.isClient) {
  Template.body.helpers({
    posts: [
      { text: "This is a seed post" },
      { text: "This is another seed post"}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
