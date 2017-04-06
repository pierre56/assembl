'use strict';
/**
 * 
 * @module app.views.user.account
 */

var Marionette = require('../../shims/marionette.js'),
    $ = require('jquery'),
    _ = require('underscore'),
    Accounts = require('../../models/accounts.js'),
    Ctx = require('../../common/context.js'),
    Agents = require('../../models/agents.js'),
    UserNavigationMenu = require('./userNavigationMenu.js'),
    i18n = require('../../utils/i18n.js'),
    Growl = require('../../utils/growl.js');

var email = Marionette.ItemView.extend({
  constructor: function email() {
    Marionette.ItemView.apply(this, arguments);
  },

  template:'#tmpl-associateAccount',
  className:'associate-email mbs',
  ui: {
      verifyEmail: '.js_verifyEmail'
    },
  events: {
      'click @ui.verifyEmail': 'verifyEmail'
    },
  serializeData: function() {
    return {
          email: this.model
        }
  },
  verifyEmail: function() {
    var urlRoot = this.model.urlRoot + '/' + this.model.get('@id').split('/')[1] + '/verify';

    var verify = new Backbone.Model();
    verify.url = urlRoot;

    verify.save(null, {
      success: function(model, resp) {

        console.log('success', resp)

      },
      error: function(model, resp) {

        console.log('error', resp)

      }
    })
  }
});

var emailList = Marionette.CompositeView.extend({
  constructor: function emailList() {
    Marionette.CompositeView.apply(this, arguments);
  },

  template: '#tmpl-associateAccounts',
  childView: email,
  childViewContainer:'.controls'
});

var socialProvidersList = Marionette.ItemView.extend({
  constructor: function socialProvidersList() {
    Marionette.ItemView.apply(this, arguments);
  },

  template: '#tmpl-socialProviders',
  initialize: function(options) {
    this.providers = options.providers;
  },
  serializeData: function() {
    return {i18n: i18n, providers: this.providers};
  }
});

var userAccount =  Marionette.ItemView.extend({
  template: '#tmpl-userAccountForm',
  ui: {
      'account': '.js_saveAccount'
    },
  events: {
    'click @ui.account': 'saveAccount'
  },
  modelEvents:{
      'add change':'render'
    },
  serializeData: function() {
    return {
      user: this.model
    }
  },
  saveAccount: function(e) {
    e.preventDefault();

    var pass1 = this.$('input[name="new_password"]'),
        pass2 = this.$('input[name="confirm_password"]'),
        user = this.$('input[name="username"]'),
        p_pass1 = pass1.parent().parent(),
        p_pass2 = pass2.parent().parent();

    if (pass1.val() || pass2.val()) {
      if (pass1.val() !== pass2.val()) {
        p_pass1.addClass('error');
        p_pass2.addClass('error');
        return false;

      } else if (pass1.val() === pass2.val()) {
        p_pass1.addClass('error');
        p_pass2.addClass('error');

        this.model.set({
          username: user.val(),
          password: pass1.val()
        });
      }
    } else {
      this.model.set({username: user.val()});
    }

    this.model.save(null, {
      success: function(model, resp) {
        Growl.showBottomGrowl(Growl.GrowlReason.SUCCESS, i18n.gettext("Your settings were saved!"));
      },
      error: function(model, resp) {
        Growl.showBottomGrowl(Growl.GrowlReason.ERROR, i18n.gettext("Your settings failed to update."));
      }
    });
  }
});

var account = Marionette.LayoutView.extend({
  constructor: function account() {
    Marionette.LayoutView.apply(this, arguments);
  },

  template: '#tmpl-userAccount',
  className: 'admin-account',
  regions: {
    'navigationMenuHolder': '.navigation-menu-holder',
    'accounts':'#associate_accounts',
    'social_accounts':'#associate_social_accounts',
    'accountForm': '#userAccountForm'
  },
  ui: {
    'addEmail': '.js_addEmail'
  },
  initialize: function() {
    this.emailCollection = new Accounts.Collection();
    this.userAcount = new Agents.Model({'@id': Ctx.getCurrentUserId()});
    this.userAcount.fetch();
    this.providers = Ctx.getJsonFromScriptTag('login-providers');
  },
  events: {
    'click @ui.addEmail': 'addEmail'
  },
  onBeforeShow: function() {
    var menu = new UserNavigationMenu({selectedSection: "account"});
    this.getRegion('navigationMenuHolder').show(menu);
    var email_domain_constraints = Ctx.getPreferences().require_email_domain;
    if (email_domain_constraints.length == 0) {
      var accounts = new emailList({
        collection: this.emailCollection
      });
      this.emailCollection.fetch();
      this.getRegion('accounts').show(accounts);

      var providers = new socialProvidersList({
        providers: this.providers
      });

      // disable until I complete the work
      this.getRegion('social_accounts').show(providers);
    }

    var userAccountForm = new userAccount({
      model: this.userAcount
    });
    this.getRegion('accountForm').show(userAccountForm);
  },

  addEmail: function(e) {
    e.preventDefault();

    var that = this,
        email = this.$('input[name="new_email"]').val().trim(),
        emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      Growl.showBottomGrowl(Growl.GrowlReason.ERROR, i18n.gettext("Empty email"));
      return;
    }

    if (!emailRegex.test(email)) {
      Growl.showBottomGrowl(Growl.GrowlReason.ERROR, i18n.gettext("Invalid email"));
      return;
    }

    var emailModel = new Accounts.Model({
      email: email,
      '@type': 'EmailAccount'
    });

    emailModel.save(null, {
      success: function() {
        that.emailCollection.fetch();
        Growl.showBottomGrowl(Growl.GrowlReason.SUCCESS, i18n.gettext("Your settings were saved"));
      },
      error: function(model, resp) {
        resp.handled = true;
        var message = Ctx.getErrorMessageFromAjaxError(resp);
        if (message === null) {
          message = i18n.gettext('Your settings failed to update');
        }
        Growl.showBottomGrowl(Growl.GrowlReason.ERROR, message);
      }
    })

  }

});

module.exports = account;
