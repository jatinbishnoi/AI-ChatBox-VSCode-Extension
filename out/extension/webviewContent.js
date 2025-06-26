"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = getWebviewContent;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function getWebviewContent(webview, extensionUri) {
    const mediaPath = vscode.Uri.joinPath(extensionUri, 'media');
    // Dynamically find the generated JS and CSS filenames
    const assetsPath = path.join(extensionUri.fsPath, 'media', 'assets');
    const jsFile = fs.readdirSync(assetsPath).find(file => file.endsWith('.js'));
    const cssFile = fs.readdirSync(assetsPath).find(file => file.endsWith('.css'));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'assets', jsFile));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'assets', cssFile));
    const htmlPath = path.join(extensionUri.fsPath, 'media', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    // Replace links to the JS and CSS with Webview-safe URIs
    html = html.replace(/<script\s+type="module"\s+src="(.+?)"><\/script>/, `<script type="module" src="${scriptUri}"></script>`);
    html = html.replace(/<link\s+rel="stylesheet"\s+href="(.+?)"\s*\/?>/, `<link rel="stylesheet" href="${styleUri}">`);
    return html;
}
//# sourceMappingURL=webviewContent.js.map