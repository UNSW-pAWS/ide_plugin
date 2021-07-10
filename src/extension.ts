// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "paws-dependecy-checker" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('paws-dependecy-checker.dependency-monitor', () => {
		return dependency_monitor();
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from pAWs-dependecy-checker!');
		
	});

	context.subscriptions.push(disposable);
}

const dependency_monitor = () =>{
	if (vscode.workspace.workspaceFolders !== undefined){
		let root_folder = vscode.workspace.workspaceFolders[0];
		let watcher = vscode.workspace.createFileSystemWatcher(
	        new vscode.RelativePattern(
	            root_folder,
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
	            console.log(devDependencies);
	            console.log(dependencies);
	            // check for vulnerbilities vulnerbilities
	            
	            // if exist display error message using the following line 
	            vscode.window.showErrorMessage('Your package ... is');
	        });
	    });
	}
	else{
		vscode.window.showErrorMessage("Working folder not found, open a folder an try again");
	}
;}