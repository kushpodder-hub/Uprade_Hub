import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-2.5 text-white font-bold text-lg mb-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-white text-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span>Upgrade Hub</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            The free student growth and productivity platform. Plan assignments, lock in study streaks, earn XP, and level up with learners worldwide.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link to="/app" className="hover:text-purple-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/app/planner" className="hover:text-purple-400 transition-colors">
            Study Planner
          </Link>
          <Link to="/app/challenges" className="hover:text-purple-400 transition-colors">
            Challenges
          </Link>
          <Link to="/app/meme-zone" className="hover:text-purple-400 transition-colors">
            Meme Zone
          </Link>
          <Link to="/app/coach" className="hover:text-purple-400 transition-colors">
            AI Coach
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 Upgrade Hub. 100% Free for Students Everywhere.</p>
        <div className="flex items-center gap-2">
          <span>Crafted for high-performing students</span>
          <span aria-hidden="true">·</span>
          <span>Zero paywalls</span>
          <span aria-hidden="true">·</span>
          <span>Open Study Community</span>
        </div>
      </div>
    </footer>
  );
};
