import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  LineChart,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  ShieldCheck,
  Target,
  Smile,
  BookOpen,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const LandingPage: React.FC = () => {
  const featureList = [
    {
      id: 'planner',
      title: 'Study Planner & Timetable',
      description:
        'Transform chaotic course syllabi into focused daily sprints. Prioritize assignments with time blocks and intelligent deadline warnings.',
      icon: CalendarDays,
      accent: 'from-blue-500/20 to-indigo-500/10',
      borderAccent: 'border-blue-500/30',
      actionLink: '/app/planner',
      actionText: 'Try Planner',
    },
    {
      id: 'tracker',
      title: 'Progress Tracker',
      description:
        'Visualize your weekly study velocity, focus quality, and subject balance with clean analytics that show true academic momentum.',
      icon: LineChart,
      accent: 'from-purple-500/20 to-pink-500/10',
      borderAccent: 'border-purple-500/30',
      actionLink: '/app/progress',
      actionText: 'View Analytics',
    },
    {
      id: 'challenges',
      title: 'Gamified Challenges',
      description:
        'Compete in 7-day study gauntlets, exam season marathons, and digital detox sprints. Lock in streaks and protect them with streak shields.',
      icon: Flame,
      accent: 'from-amber-500/20 to-orange-500/10',
      borderAccent: 'border-amber-500/30',
      actionLink: '/app/challenges',
      actionText: 'Browse Challenges',
    },
    {
      id: 'rewards',
      title: 'Rewards Store',
      description:
        'Earn XP for every minute of deep work. Unlock custom avatar crests, library soundscapes, dark theme skins, and study accolades.',
      icon: Award,
      accent: 'from-emerald-500/20 to-teal-500/10',
      borderAccent: 'border-emerald-500/30',
      actionLink: '/app/rewards',
      actionText: 'Explore Store',
    },
    {
      id: 'coach',
      title: 'AI Student Coach',
      description:
        'Get actionable active recall strategies, Pomodoro pacing plans, and essay milestone breakdowns tailored to your cognitive stamina.',
      icon: Sparkles,
      accent: 'from-violet-500/20 to-purple-500/10',
      borderAccent: 'border-violet-500/30',
      actionLink: '/app/coach',
      actionText: 'Ask Coach',
    },
  ];

  const benefits = [
    {
      title: '100% Free Forever for Students',
      description:
        'No subscription walls, no locked premium tiers. Every student deserves enterprise-grade productivity tools to excel in their education.',
      icon: ShieldCheck,
    },
    {
      title: 'Gamified Dopamine for Deep Work',
      description:
        'Level up from Freshman Novice to Summa Cum Laude. Daily goals, streaks, and XP systems turn tedious study sessions into an engaging quest.',
      icon: Target,
    },
    {
      title: 'Science-Backed Focus Architectures',
      description:
        'Built around active recall, spaced repetition cadence, and Pomodoro flow states so you study smarter in less total time.',
      icon: Brain,
    },
    {
      title: 'Zero Distraction & Relatable Community',
      description:
        'A student-friendly vibe with healthy campus competition and a dedicated Meme Zone to decompress during well-earned study breaks.',
      icon: Smile,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left copy column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 tracking-wide mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>The Student Growth & Productivity OS</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">100% Free & Open</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
                Your Growth. Your Journey.{' '}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-200 bg-clip-text text-transparent">
                  Your Upgrade.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Upgrade Hub helps students <span className="text-white font-medium">PLAN</span>,{' '}
                <span className="text-white font-medium">LEARN</span>,{' '}
                <span className="text-white font-medium">TRACK</span>,{' '}
                <span className="text-white font-medium">COMPETE</span>, and{' '}
                <span className="text-white font-medium">GROW</span> through an engaging, gamified
                workspace built to defeat procrastination and accelerate academic mastery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/app"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all whitespace-nowrap"
                >
                  <span>Explore Features</span>
                </a>
              </div>

              {/* Micro-proof indicators */}
              <div className="mt-10 pt-8 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Built for university & high school</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span>Interactive XP & Streak system</span>
                </div>
              </div>
            </div>

            {/* Right preview column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-purple-950/30 group">
                <img
                  src="/src/assets/images/hero_student_workspace_1793939334671.jpg"
                  alt="Student study workspace setup with Upgrade Hub planner"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Floating Preview Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-lg">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-white">Daily Focus Session Active</span>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-purple-300 font-semibold">
                      +80 XP Earned
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    CS 201: Dijkstra Algorithm Implementation · 45 mins locked in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-2">
              Everything You Need To Excel
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Engineered For Modern Student Productivity
            </h3>
            <p className="text-slate-400 mt-4 text-base">
              A comprehensive toolkit replacing messy notes, disconnected calendars, and unmotivated cram sessions with an all-in-one growth hub.
            </p>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureList.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`rounded-2xl p-6 bg-slate-900/80 border ${feature.borderAccent} hover:border-purple-500/60 transition-all hover:-translate-y-1 duration-200 flex flex-col justify-between ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400 mb-5 border border-slate-700/60">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>

                  <Link
                    to={feature.actionLink}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors pt-4 border-t border-slate-800"
                  >
                    <span>{feature.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}

            {/* Quick Community & Meme Zone Feature Card */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-950/40 to-slate-900/80 border border-purple-500/30 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-900/40 flex items-center justify-center text-purple-300 mb-5 border border-purple-500/30">
                  <Smile className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Student Meme Zone & Chill</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Take a legitimate 10-minute study break. Browse relatable midterm humor, upvote student memes, and recharge your focus without social media rabbit holes.
                </p>
              </div>
              <Link
                to="/app/meme-zone"
                className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white transition-colors pt-4 border-t border-slate-800"
              >
                <span>Visit Meme Zone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Spotlight Banner */}
      <section id="gamification" className="py-20 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-indigo-950/40 border border-purple-500/30 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                The Dopamine Formula
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                Level 1 Freshman to Summa Cum Laude Scholar
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Procrastination happens when academic rewards are months away. Upgrade Hub creates immediate feedback loops: finish a math derivation, get +60 XP, protect your 14-day streak, and unlock ambient binaural soundscapes for your next study session.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">+80 XP</div>
                  <div className="text-xs text-slate-400">Per Problem Set</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 font-mono tabular-nums">14 Days</div>
                  <div className="text-xs text-slate-400">Average Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-300 font-mono tabular-nums">100%</div>
                  <div className="text-xs text-slate-400">Free to Use</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">0 Ads</div>
                  <div className="text-xs text-slate-400">Pure Study Focus</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-xl max-w-xs w-full text-center">
                <img
                  src="/src/assets/images/gamified_achievement_badge_1793939335298.jpg"
                  alt="Achievement Crest"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 mx-auto mb-4 rounded-xl object-contain drop-shadow-md"
                />
                <h5 className="text-base font-bold text-white">Dean's List Aspirant</h5>
                <p className="text-xs text-slate-400 mt-1 mb-3">Tier 12 Academic Scholar</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[85%]" />
                </div>
                <p className="text-[11px] text-purple-300 font-mono mt-2 tabular-nums">
                  4,850 / 5,000 XP to Tier 13
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-2">
              Why Upgrade Hub?
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Built Specifically Around Student Needs
            </h3>
            <p className="text-slate-400 mt-4 text-base">
              Traditional productivity tools are built for corporate managers. Upgrade Hub is built for the student cramming for organic chemistry at midnight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{benefit.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-400 mt-2 text-sm">
              Clear answers for students wanting to upgrade their workflow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1.5">Is Upgrade Hub really completely free?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes. Upgrade Hub is free for all students. There are no credit cards, no premium trial expirations, and no locked essentials.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1.5">How does the XP and leveling system work?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You earn XP whenever you check off scheduled daily goals, complete focus blocks, participate in study challenges, or maintain your study streak. XP unlocks custom badges, dark theme skins, and audio soundscapes.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-sm font-bold text-white mb-1.5">What is the AI Student Coach?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The AI Student Coach provides science-backed revision schedules, essay structure breakdowns, and active recall suggestions to help you prepare methodically without burning out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-purple-950/20 border-t border-slate-800 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-extrabold text-white mb-4">
            Ready to upgrade your study game?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Join students from Stanford, MIT, Berkeley, and beyond who turn chaotic semesters into structured victories.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/40 hover:shadow-purple-600/60 transition-all active:scale-95"
          >
            <span>Launch Upgrade Hub</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
