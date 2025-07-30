import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	const completer = vscode.languages.registerCompletionItemProvider(
		'html',
		{
			async provideCompletionItems(document, pos){
				const text = document.lineAt(pos).text;
				const regex = /<img\s[^>]*src=["']([^"']+)["'][^>]*>?/;

				const textCorresponds = regex.exec(text);
				if(!textCorresponds) return;

				const src = textCorresponds[1];

				const suggestion = new vscode.CompletionItem(`alt="${src}"`, vscode.CompletionItemKind.Value);
                suggestion.insertText = `alt="${src}"`;
                suggestion.detail = 'Imagevoice suggestion';
                suggestion.documentation = 'This is a test!';
				
				return [suggestion];
			}
		},
		' '
	);
	context.subscriptions.push(completer);
}

export function deactivate() {}

