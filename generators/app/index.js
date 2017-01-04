'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('generator-yashible-role') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      default: this.appname,
      message: 'Your Role name'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const fixedFiles = [
      '.gitignore',
      '.kitchen.yml',
      '.travis.yml',
      'ansible.cfg',
      'chefignore',
      'LICENSE',
      'requirements.yml',
      'vagrant.yml'
    ];

    for (var i = 0; i < fixedFiles.length; i++) {
      this.fs.copy(
        this.templatePath(fixedFiles[i]),
        this.destinationPath(fixedFiles[i])
      );
    }

    this.fs.copyTpl(
      this.templatePath('defaults/main.yml'),
      this.destinationPath('defaults/main.yml'),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
