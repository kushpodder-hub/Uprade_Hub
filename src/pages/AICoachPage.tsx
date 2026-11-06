import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, Brain, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';
import { coachAdviceLibrary } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AICoachPage: React.FC = () => {
  const { addXp } = useApp();
  const [selectedTopic, setSelectedTopic] = useState(coachAdviceLibrary[0]);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: "Hello Alex! I'm your Upgrade Hub Student Coach. I can help you structure your revision schedule, apply active recall protocols, or troubleshoot study roadblocks. What are we tackling today?",
    },
    {
      role: 'assistant',
      text: selectedTopic.response,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSelectTopic = (topic: typeof coachAdviceLibrary[0]) => {
    setSelectedTopic(topic);
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: topic.prompt },
      { role: 'assistant', text: topic.response },
    ]);
    addXp(15, 'Consulted AI Student Coach playbook');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userQuery = inputText.trim();
    setInputText('');

    // Generate tailored pedagogical response based on keywords
    let responseText = `### Suggested Study Strategy for "${userQuery}":
1. **Immediate Focus Block (45 mins)**: Close secondary tabs. Dedicate one unbroken sprint to write out the raw notes or solve 2 sample questions without checking answers.
2. **Retrieval Verification (15 mins)**: Flip the textbook or problem sheet upside down. Summarize what you just executed from active memory.
3. **Rest & Recharge**: Take 5 minutes away from screens before starting sprint #2.`;

    if (userQuery.toLowerCase().includes('exam') || userQuery.toLowerCase().includes('test')) {
      responseText = `### High-Yield Exam Protocol:
- **Prioritize Past Papers**: Spend 70% of remaining hours doing practice problems under strict time pressure rather than passively re-reading slides.
- **The Error Log**: Maintain a dedicated list of mistakes. Every concept you missed must be rewritten in your own words before going to sleep.`;
    } else if (userQuery.toLowerCase().includes('math') || userQuery.toLowerCase().includes('code')) {
      responseText = `### STEM Proof & Coding Framework:
- **Decompose into Invariants**: Break the problem into inputs, known constraints, and base cases.
- **Rubber Duck Technique**: Explain the algorithm or proof step aloud. If you cannot explain the step in simple English, that is where the conceptual gap lies.`;
    }

    setChatMessages((prev) => [
      ...prev,
      { role: 'user', text: userQuery },
      { role: 'assistant', text: responseText },
    ]);

    addXp(20, 'Consulted AI Student Coach');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <span>AI Student Coach & Study Playbooks</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evidence-based cognitive science strategies, revision protocols, and focus pacing.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div>
        <p className="text-xs font-semibold text-slate-400 mb-2">High-Yield Study Protocols:</p>
        <div className="flex flex-wrap gap-2">
          {coachAdviceLibrary.map((item) => (
            <button
              key={item.topic}
              onClick={() => handleSelectTopic(item)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-200 hover:text-white transition-all text-left flex items-center gap-2"
            >
              <Brain className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{item.topic}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat / Advice Interface */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col h-[520px]">
        {/* Messages scroll area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white font-medium'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/60 flex gap-2">
          <input
            type="text"
            placeholder="Ask coach: e.g. How do I study for a 3-hour midterm with low energy?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-purple-600/30 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Coach</span>
          </button>
        </form>
      </div>
    </div>
  );
};
