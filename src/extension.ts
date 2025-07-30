import * as vscode from 'vscode';
import { decodeByLsb } from './decode';
import path from 'path';

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

				const absoluteSrc = path.resolve(path.dirname(document.uri.fsPath) , src);

				const altText = await decodeByLsb(absoluteSrc);

				const suggestion = new vscode.CompletionItem(`alt="${altText}"`, vscode.CompletionItemKind.Value);
                suggestion.insertText = `alt="${altText}"`;
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

