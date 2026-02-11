const vscode = require('vscode');

async function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('favorite-subdir.setFavorite', async (uri) => {
        if (!uri || !uri.fsPath) {
            const uris = await vscode.window.showOpenDialog({
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                title: 'Select Favorite Terminal Directory'
            });
            if (uris && uris[0]) uri = uris[0];
            else return;
        }
        await vscode.workspace.getConfiguration('terminal.integrated').update('cwd', uri.fsPath, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`Terminal CWD set to: ${uri.fsPath}`);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('favorite-subdir.clearFavorite', async () => {
        await vscode.workspace.getConfiguration('terminal.integrated').update('cwd', undefined, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage('Favorite Terminal Directory cleared.');
    }));
}

function deactivate() {}

module.exports = { activate, deactivate };
