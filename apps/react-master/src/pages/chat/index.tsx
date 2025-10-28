import React, { use, useState } from "react";
import { marked } from "marked";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        if (!input.trim()) return;
        setMessages((msg) => [...msg, { role: "user", content: input }]);
        setLoading(true);
        let aiContent = '';
        const newMsg = { role: 'assistant', content: '' };
        setMessages((msg) => [...msg, newMsg]);

        // 使用EeventSourcee 兼容SSE
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: input })
        })

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let buffer = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split('\n\n');
                buffer = parts.pop();
                for (const part of parts) {
                    if (part.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(part.slice(6));
                            if (data.content) {
                                aiContent += data.content
                                    .replace(/\\n/g, '\n')
                                    .replace(/\\r/g, '\r')
                                    .replace(/\\"/g, '"');
                                setMessages((msgs) => {
                                    const update = [...msgs];
                                    update[update.length - 1] = { role: 'assistant', content: aiContent }
                                    return update;
                                })
                            }
                        } catch () {
                        }
                    }
                }
            }
        }

        setLoading(false);
        setInput('')
    };
    return (
        <div className="max-w-2xl mx-auto my-10 font-sans">
            <h2 className="text-2xl font-bold mb-6">用提问获取知识</h2>{' '}
            <div className="border border-gray-200 rounded-lg p-4 min-h-[300px] bg-gray-50">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className="my-3"
                        style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}
                    >
                        <div
                            className={`inline-block max-w-[90%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                                }`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: marked.parse(msg.content || '') }} />
                        </div>
                    </div>
                ))}
                {loading && <div className="text-gray-400">AI 正在思考...</div>}{' '}
            </div>
            <div className="flex gap-2 mt-4">
                <textarea
                    className="flex-1 resize-none rounded border border-gray-300 px-2 py-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                    placeholder="请输入你的问题..."
                    disabled={loading}
                />
                <button
                    className="px-4 py-1 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                >
                    发送
                </button>
            </div>
        </div>
    )
}