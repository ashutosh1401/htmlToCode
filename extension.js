// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
let fs = require('fs')
const path = require("path")
const findClassandValue = require("./findClass")
const createCSS = require('./createCSSfile')
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htmlToCode" is now active!');
	// console.log(context)

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('htmlToCode.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from html-to-code!');
	});
	let path_of_file = vscode.commands.registerCommand('htmlToCode.createClass', function () {
		let message
		let currentFile
		let textEditor = vscode.window.activeTextEditor

		if(textEditor) {
			// console.log(textEditor.document.fileName, path.basename(textEditor.document.fileName))
			if(path.extname(textEditor.document.fileName) == '.html') {

				message = textEditor.document.fileName
				currentFile = textEditor.document.fileName
				let readdata = `` 
				try {
					const data = fs.readFileSync(currentFile, 'utf8');
					// console.log(data);
					readdata += data
				} catch (err) {
					console.error(err);
					vscode.window.showErrorMessage(err);
				}
				//   console.log(readdata, typeof(readdata))
				let classesValue = findClassandValue(readdata)
				let wf = vscode.workspace.workspaceFolders[0].uri.path ;
				let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
				//   console.log(`${wf}-${f}`)

				//   console.log(classesValue)
				createCSS(f,classesValue)
				vscode.window.showInformationMessage(message);
			}
			else {
				message = "YOUR-EXTENSION: Only works on html files please try on active html files" ;
		
				vscode.window.showErrorMessage(message);
			}
		}
		else {
			message = "YOUR-EXTENSION: Working file not found, open a folder an try again" ;
		
			vscode.window.showErrorMessage(message);
		}
	
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(path_of_file);
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
