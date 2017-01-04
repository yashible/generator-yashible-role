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

    var prompts = [
      {
        type: 'input',
        name: 'name',
        default: this.appname,
        message: 'Your Role name',
        required: true
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your Role description',
        required: true
      }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    const fixedFiles = [
      '.kitchen.yml',
      '.travis.yml',
      'ansible.cfg',
      'chefignore',
      'LICENSE',
      'requirements.yml',
      'vagrant.yml',
      'test/inventory',
      'test/integration/default/default.yml'
    ];

    for (var i = 0; i < fixedFiles.length; i++) {
      this.fs.copy(
        this.templatePath(fixedFiles[i]),
        this.destinationPath(fixedFiles[i])
      );
    }

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('test/integration/default/serverspec/rolename_spec.rb'),
      this.destinationPath('test/integration/default/serverspec/' + this.props.name + '_spec.rb')
    );

    var templateFiles = [
      'defaults/main.yml',
      'handlers/main.yml',
      'tasks/main.yml',
      'vars/main.yml',
      'meta/main.yml',
      'test/test.yml',
      'README.md',
      'Vagrantfile'
    ];

    for (var j = 0; j < templateFiles.length; j++) {
      this.fs.copyTpl(
        this.templatePath(templateFiles[j]),
        this.destinationPath(templateFiles[j]),
        this.props
      );
    }
  }
});
