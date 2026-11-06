import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { AppHeader } from '../components/common/AppHeader';

const routeTitleMap: Record<string, string> = {
  '/app': 'Dashboard',
  '/app/planner': 'Study Planner & Timetable',
  '/app/progress': 'My Progress & Analytics',
  '/app/challenges': 'Active Challenges',
  '/app/leaderboard': 'Global & Campus Leaderboard',
  '/app/meme-zone': 'Student Meme Zone',
  '/app/rewards': 'Rewards Store & Unlocks',
  '/app/coach': 'AI Student Coach',
  '/app/settings': 'Settings & Study Targets',
};

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentTitle = routeTitleMap[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main app viewport shifted by sidebar on desktop */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <AppHeader
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          pageTitle={currentTitle}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
