// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import fetch from 'node-fetch';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "paws-dependecy-checker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('paws-dependecy-checker.dependency-monitor', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello you are loading in paws-dependecy-checker!');
		dependencyMonitor();
	});

	context.subscriptions.push(disposable);
}


const getVulnerbilities = async (devDependencies: JSON, dependencies: JSON) =>{
	let dependencies_list = Object.keys(dependencies);
	let devdependencies_list = Object.keys(devDependencies);
	await fetch("http://127.0.0.1:5000/threat/search", {method:"POST", body:JSON.stringify({"package_manager_type":"npm", "package_list" : dependencies_list , "level": 0}), headers:{"Content-Type": "application/json"}})
		.then(r => {return r.json()})
		.then(msg => {
			console.log("dependencies");
			for (let key in msg){
				let list = msg[key];
				if (list.length > 0){
					// if exist display error message using the following line 
		            vscode.window.showErrorMessage('Your dependency package ' +key+' is potentially vulnearble. Please visit our site http://www.google.com to find out more');
				}
			}
		});

	await fetch("http://127.0.0.1:5000/threat/search", {method:"POST", body:JSON.stringify({"package_manager_type":"npm", "package_list" : devdependencies_list , "level": 0}), headers:{"Content-Type": "application/json"}})
		.then(r => {return r.json()})
		.then(msg => {
			console.log("devdependencies");
			for (let key in msg){
				let list = msg[key];
				if (list.length > 0){
					// if exist display error message using the following line 
					vscode.window.showErrorMessage('Your devdependencies package ' +key+' is potentially vulnearble. Please visit our site http://www.google.com to find out more');
				}
			}
		});
}

const dependencyMonitor = () =>{
	if (vscode.workspace.workspaceFolders !== undefined){
		let rootFolder = vscode.workspace.workspaceFolders[0];
		let watcher = vscode.workspace.createFileSystemWatcher(
	        new vscode.RelativePattern(
	            rootFolder,
	            'package.json'
	        ),
	        false,
	        false,
	        false
	    );
	
	    watcher.onDidChange(e => {
	        vscode.workspace.openTextDocument(e).then(document => {
	            if (document.languageId !== "json") return;  
	            let text = document.getText();
	            let jsonText = JSON.parse(text);
	            // do check for keys before doing what i did
	            let devDependencies = jsonText["devDependencies"];
	            let dependencies = jsonText["dependencies"];
	            getVulnerbilities(devDependencies, dependencies);
	        });
	    });
	}
	else{
		vscode.window.showErrorMessage("Working folder not found, open a folder an try again");
	}
};

// this method is called when your extension is deactivated
export function deactivate() {}