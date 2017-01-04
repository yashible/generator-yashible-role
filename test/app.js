'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('yashible-role:app', function () {
  var projectName = 'yashible-test';

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: projectName
      })
      .toPromise();
  });

  it('creates fixed files', function () {
    const expected = [
      '.gitignore',
      '.kitchen.yml',
      '.travis.yml',
      'ansible.cfg',
      'chefignore',
      'LICENSE',
      'requirements.yml',
      'vagrant.yml'
    ];

    assert.file(expected);
  });

  it('creates role files with project name', function () {
    const expected = [
      'defaults',
      'handlers',
      'tasks',
      'vars'
    ];

    for (var i = 0; i < expected.length; i++) {
      assert.file(expected[i] + '/main.yml');
      assert.fileContent(expected[i] + '/main.yml', '---\n# ' + expected[i] + ' file for ' + projectName + '\n');
    }
  });

  it('creates Vagrantfile with appropriate folder name', function () {
    assert.file('Vagrantfile');
    assert.fileContent('Vagrantfile', new RegExp('config\\.vm\\.synced_folder \'\\.\', \'/' + projectName + '\''));
    assert.fileContent('Vagrantfile', new RegExp('a.provisioning_path = \'/' + projectName + '\''));
  });
});
