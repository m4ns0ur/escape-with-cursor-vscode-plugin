import * as vscode from 'vscode';

let previousCursorPosition: vscode.Position | null = null;

export function activate(context: vscode.ExtensionContext) {
    // Listen for text selection changes to save cursor position
    vscode.window.onDidChangeTextEditorSelection((event) => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;

            // Save the cursor position when there's no selection
            if (selection.isEmpty) {
                previousCursorPosition = selection.start;
            }
        }
    });

    // Register command to handle 'Escape' key
    let disposable = vscode.commands.registerCommand('escapeWithCursor.keepCursor', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor && previousCursorPosition) {
            const selection = editor.selection;

            // Check if there's an active selection to clear it
            if (!selection.isEmpty) {
                // Restore the cursor to the end of the selection
                editor.selection = new vscode.Selection(previousCursorPosition, previousCursorPosition);
            }
        }
    });

    // Push the command to the context subscriptions
    context.subscriptions.push(disposable);
}

export function deactivate() {}
