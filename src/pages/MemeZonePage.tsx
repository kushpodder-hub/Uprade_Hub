import React, { useState } from 'react';
import { Laugh, ThumbsUp, Plus, Sparkles, MessageSquare, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MemeZonePage: React.FC = () => {
  const { memes, upvoteMeme, addMeme } = useApp();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newTag, setNewTag] = useState('Midterms');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;
    addMeme(newTitle.trim(), newCaption.trim(), newTag);
    setNewTitle('');
    setNewCaption('');
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Laugh className="w-6 h-6 text-pink-400" />
            <span>Student Meme Zone & Study Break Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Recharge your brain during 5-minute Pomodoro breaks. Upvote fellow students to earn +5 XP!
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm shadow-purple-600/30 transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Drop a Meme (+25 XP)</span>
        </button>
      </div>

      {/* Meme Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="text-purple-400 font-semibold">{meme.tag}</span>
                <div className="flex items-center gap-1.5">
                  <span>@{meme.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{meme.timestamp}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-3">{meme.title}</h3>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {meme.caption}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => upvoteMeme(meme.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono tabular-nums transition-all ${
                  meme.hasUpvoted
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{meme.upvotes} Upvotes</span>
              </button>

              <span className="text-slate-400 text-[11px]">
                {meme.hasUpvoted ? 'Upvoted (+5 XP claimed)' : 'Click to support (+5 XP)'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Meme Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Post a Relatable Study Meme</h4>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Meme Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. When you check syllabus on week 7..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Category Tag
                </label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="Midterms">Midterms</option>
                  <option value="STEM Math">STEM Math</option>
                  <option value="Coding">Coding</option>
                  <option value="Dorm Life">Dorm Life</option>
                  <option value="Upgrade Hub">Upgrade Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Caption / Joke Body
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Type your funny study observation or conversation..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm"
                >
                  Post Meme (+25 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
