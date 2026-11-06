import React, { useState } from 'react';
import { Store, Zap, Check, Lock, Palette, Headphones, Sparkles, Shield, Coffee, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RewardsStorePage: React.FC = () => {
  const { profile, rewards, purchaseReward, toggleRewardActive } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Themes', 'Soundscapes', 'Badges', 'Avatars'];

  const filteredRewards = rewards.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Store className="w-6 h-6 text-purple-400" />
            <span>Student Gamified Rewards Store</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Redeem the XP you earned through deep study for study themes, soundscapes, and avatar crests.
          </p>
        </div>

        {/* Current XP balance banner */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-purple-500/30">
          <Zap className="w-4 h-4 text-purple-400 fill-purple-400" />
          <span className="text-xs text-slate-300">Available Balance:</span>
          <span className="font-mono text-sm font-bold text-purple-300 tabular-nums">
            {profile.currentXp.toLocaleString()} XP
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors capitalize ${
              activeCategory === cat ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Unlocks' : cat}
          </button>
        ))}
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((item) => {
          const canAfford = profile.currentXp >= item.costXp;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                item.purchased
                  ? 'bg-slate-900/80 border-slate-700/80'
                  : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/30'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>

                  <span className="text-xs font-mono tabular-nums px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-purple-300 font-semibold">
                    {item.costXp} XP
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {item.purchased ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <Check className="w-4 h-4" />
                      <span>Unlocked</span>
                    </span>

                    <button
                      onClick={() => toggleRewardActive(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        item.active
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {item.active ? 'Equipped' : 'Equip'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => purchaseReward(item.id)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      canAfford
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm shadow-purple-600/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    {!canAfford && <Lock className="w-3.5 h-3.5" />}
                    <span>{canAfford ? 'Redeem for ' + item.costXp + ' XP' : 'Need More XP'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
