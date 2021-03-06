#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash')
const YAML = require('yamljs')

const projects = YAML.load('./projects.yml');
const alfredProjects = generateAlfredProjects(projects);
assertProjectsExist(alfredProjects);
injectIntoXml(alfredProjects);

function generateAlfredProjects(projects) {
  const alfredProjects = projects.map(({projectPath, imageName, projectName, ignoreNonexistentPath}) => {
    try {
      fs.accessSync(projectPath, fs.F_OK);
    } catch (e) {
      if (!ignoreNonexistentPath) {
        console.warn(`${projectPath} doesn't exist or is not accessible`)
        return null;
      }
    }

    console.log(`adding ${projectPath} ...`);
    if (!projectName) {
      projectName = path.basename(projectPath)
    }

    const alfredProject = {
      title: projectName,
      arg: projectPath,
      subtitle: projectPath,
      imagefile: `${imageName}.png`,
    };

    return alfredProject;
  });

  return _.sortBy(alfredProjects, 'title');
}

function assertProjectsExist(alfredProjects) {
  if (alfredProjects.includes(null)) {
    console.error('some project directories couldn\'t be found. aborting... ');
    process.exit(1);
  }
  return alfredProjects;
}

function injectIntoXml(alfredProjects) {
  const plist = require('plist');
  fs.copySync(path.resolve(`${__dirname}/info.plist`), `${__dirname}/info.plist.generatebackup`);
  const file = fs.readFileSync(`${__dirname}/info.plist.generatebackup`, 'utf-8');
  const plistJson = plist.parse(file);
  plistJson.objects[1].config.items = JSON.stringify(alfredProjects);
  fixedPlistJson = fixPlistLibraryNullKey(plistJson);
  const updatedPlist = plist.build(fixedPlistJson)
  fs.writeFileSync(`${__dirname}/info.plist`, updatedPlist);
}

function fixPlistLibraryNullKey(plistJson) {
  const traverse = require('traverse');
  traverse(plistJson).forEach(function(node) {
    if (node === null) {
      this.update('');
    }
  })
  return plistJson;
}
