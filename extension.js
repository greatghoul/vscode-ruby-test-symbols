const vscode = require('vscode');

class RubyTestSymbolProvider {
  provideDocumentSymbols(document, token) {
    return new Promise((resolve, reject) => {
      var symbols = [];

      for (var i = 0; i < document.lineCount; i++) {
        var line = document.lineAt(i);
        if (line.text.startsWith("@")) {
          symbols.push({
            name: line.text.substr(1),
            kind: vscode.SymbolKind.Field,
            location: new vscode.Location(document.uri, line.range)
          });
        }
      }

      resolve(symbols);
    });
  }
}


function activate(context) {

	let provider = vscode.languages.registerDocumentSymbolProvider({ language: 'ruby' }, new RubyTestSymbolProvider());
	context.subscriptions.push(provider);

	vscode.window.showInformationMessage('Congratulations, your extension "ruby-test-symbols" is now active!');
	console.log('Congratulations, your extension "ruby-test-symbols" is now active!');
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
