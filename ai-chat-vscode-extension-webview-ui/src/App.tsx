import { useState, useEffect, useRef } from 'react';

// 👇 VS Code API Bridge
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Scroll to bottom when new message arrives
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    vscode.postMessage({
      type: 'userInput',
      text: input,
    });

    setMessages((prev) => [...prev, `🧑‍💻 You: ${input}`]);
    setInput('');
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'botResponse') {
        setMessages((prev) => [...prev, `🤖 AI: ${message.text}`]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      style={{
        padding: '16px',
        fontFamily: 'Segoe UI, Roboto, sans-serif',
        backgroundColor: '#f8f9fa',
        height: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ color: '#007acc', marginBottom: 10 }}>💬 AI Code Assistant</h2>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 12,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              margin: '6px 0',
              whiteSpace: 'pre-wrap',
              color: msg.startsWith('🤖') ? '#333' : '#555',
            }}
          >
            {msg}
          </p>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a coding question..."
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #ccc',
            fontSize: 14,
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 8,
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
