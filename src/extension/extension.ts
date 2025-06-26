import * as vscode from 'vscode';
import { getWebviewContent } from './webviewContent';
import { getAIResponse } from './geminiService';  // ✅ Now using Gemini service

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('aiChat.openChat', () => {
      const panel = vscode.window.createWebviewPanel(
        'aiChat',
        'AI Code Assistant (Gemini)',
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);

      panel.webview.onDidReceiveMessage(
        async (message) => {
          if (message.type === 'userInput') {
            const userPrompt = message.text;
            const aiReply = await getAIResponse(userPrompt);

            panel.webview.postMessage({
              type: 'botResponse',
              text: aiReply,
            });
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

export function deactivate() {}
