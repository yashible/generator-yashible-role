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

  it('creates defaults/main.yml with project name', function () {
    assert.file('defaults/main.yml');
    assert.fileContent('defaults/main.yml', '---\n#defaults file for ' + projectName + '\n');
  });
});
