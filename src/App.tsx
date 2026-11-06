/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { MyProgressPage } from './pages/MyProgressPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { MemeZonePage } from './pages/MemeZonePage';
import { RewardsStorePage } from './pages/RewardsStorePage';
import { AICoachPage } from './pages/AICoachPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Student Dashboard & Workspaces */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="planner" element={<StudyPlannerPage />} />
            <Route path="progress" element={<MyProgressPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="meme-zone" element={<MemeZonePage />} />
            <Route path="rewards" element={<RewardsStorePage />} />
            <Route path="coach" element={<AICoachPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
