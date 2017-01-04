'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var yaml = require('yamljs');

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
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Your Role tags (separated by comma, centos is added by default)'
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

    var metaPath = this.destinationPath('meta/main.yml');
    var metaContent = this.fs.read(metaPath);
    var meta = yaml.parse(metaContent);
    if (this.props.tags !== '') {
      var tags = this.props.tags.replace(/\s+/g, '').split(',');
      // eslint-disable-next-line camelcase
      meta.galaxy_info.galaxy_tags = tags.concat(meta.galaxy_info.galaxy_tags);
    }
    var yamlContent = yaml.stringify(meta, 4, 2);
    this.fs.write(metaPath, yamlContent);
  }
});
