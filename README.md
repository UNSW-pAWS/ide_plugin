# pAWS | Visual Studio Code Plugin

<br/>

<p align="center">
  <img width="200" src="./static/logo.png">
</p>


<br/>
<br/>

This plugin instantly informs users about critical vulnerabilities impacting their code.

## For operating purpose (For Developers)
#### Disclaimer: This is not raw live on VSCode Marketplace so to run this user will have to follow the steps as a developer

### Requirements
1. Node.js
2. Yeoman
3. VS Code Extension Generator

Commands to download Yeoman and VS Code Extension Generator
```
npm install -g yo generator-code
```

## Notes

The current api endpoint the extension query from is http://paws-backend.ap-southeast-2.elasticbeanstalk.com/threat/search. This maybe taken down hence please change line 32 and 54 from
```
let r = await fetch("http://paws-backend.ap-southeast-2.elasticbeanstalk.com/threat/search", {method:"POST", body:JSON.stringify({"package_manager_type":"npm", "package_list" : [item] , "level": 0, "severity": ["CRITICAL"], "date": "None"}), headers:{"Content-Type": "application/json"}});
```
to
```
let r = await fetch("http://127.0.0.1:5000/threat/search", {method:"POST", body:JSON.stringify({"package_manager_type":"npm", "package_list" : [item] , "level": 0, "severity": ["CRITICAL"], "date": "None"}), headers:{"Content-Type": "application/json"}});
```
and ensure the backend located at https://github.com/UNSW-pAWS/webapp-backend is up and running before proceeding to how to operate.

## How to operate
1. Open up the root folder of this project in VS Code
(For first time running of project please proceed to step 4)
2. open up command line and type 
```
npm i
```
3. in your command line type 
```
npm run watch
```
4. Open up ```src/extension.ts``` and Press ```F5``` (Another VS Code will open up. This is to simulate the Extension running enviroment) may need to choose ```VS Code Extension Development``` if running for first time
5. Run the extension (Press "Ctrl" + "Shift" + "P") and Choose "Dependency Monitor"

<!-- Please keep the following in case we want to publish our work in the future -->
<!-- # paws-dependecy-checker README

This is the README for your extension "paws-dependecy-checker". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!** -->
