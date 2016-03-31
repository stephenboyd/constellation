Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'postsArea'});

Router.route('/following', {
  name: 'following',
});


Router.route('/posts/:_id', {
  name: 'postPage',
  template: 'postPage',
});

Router.route('user/:username', {
  name: 'userPage',
  template: 'userPage',
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
