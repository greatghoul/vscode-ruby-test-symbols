const vscode = require('vscode');

const PATTERN_GROUP_OR_EXAMPLE = new RegExp([
  '^\\s*(RSpec\.)?(',
  'describe|context|it|test|should|',
  'shared_examples_for|shared_examples|',
  'shared_context|shared_context_for|',
  'it_behaves_like|it_should_behave_like|',
  'include_context|include_examples)',
  '\\s+.*$'
].join(''));

class RubyTestSymbolProvider {
  provideDocumentSymbols(document, token) {
    return new Promise((resolve, reject) => {
      var symbols = [];

      for (var i = 0; i < document.lineCount; i++) {
        var line = document.lineAt(i);
        if (PATTERN_GROUP_OR_EXAMPLE.test(line.text)) {
          symbols.push({
            name: line.text.replace(/^\s+/gm, (match) => '\u200B '.repeat(match.length)),
            kind: vscode.SymbolKind.Namespace,
            location: new vscode.Location(document.uri, line.range)
          });
        }
      }

      resolve(symbols);
    });
  }
}


function activate(context) {
  let languageSelector = { language: 'ruby', pattern: '**/*_test.rb' };
  let provider = vscode.languages.registerDocumentSymbolProvider(languageSelector, new RubyTestSymbolProvider());
	context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
