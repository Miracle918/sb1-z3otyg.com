import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && username.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        user: username,
        text: inputMessage.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Simple Chat</h1>
      </header>
      <main className="flex-grow flex flex-col p-4 max-w-3xl mx-auto w-full">
        {!username ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enter your name to start chatting</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (username.trim()) setUsername(username.trim());
            }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Your name"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Join Chat
              </button>
            </form>
          </div>
        ) : (
          <>
            <div id="chat-container" className="flex-grow bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.user === username ? 'text-right' : ''}`}>
                  <span className="font-semibold">{message.user}: </span>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow p-2 border rounded-l"
                placeholder="Type a message..."
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                <Send size={20} />
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

export default App;