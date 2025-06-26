import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const mediaPath = vscode.Uri.joinPath(extensionUri, 'media');
  const indexHtmlPath = path.join(extensionUri.fsPath, 'media', 'index.html');

  let html = fs.readFileSync(indexHtmlPath, 'utf8');

  // ✅ Fix JS & CSS asset paths
  const assetsUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'assets')).toString();
  html = html.replace(/"\.\/assets\//g, `"${assetsUri}/`);

  // ✅ Fix Vite Favicon (vite.svg) path
  const viteSvgUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'vite.svg')).toString();
  html = html.replace(/"\.\/vite\.svg"/g, `"${viteSvgUri}"`);

  return html;
}
