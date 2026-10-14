import React from 'react';
import { Clock, UserCheck, Star, ShieldCheck } from 'lucide-react';

const valueMetrics = [
  {
    metric: '2–4 Weeks',
    title: 'Typical Launch Window',
    description: 'Rapid, disciplined sprints from audit to production without scope drag.',
    icon: Clock,
    source: 'Verified Ethixweb Operating Standard',
  },
  {
    metric: '100% Senior',
    title: 'Direct Engineering Access',
    description: 'Work directly with senior developers and strategists. Zero junior handoffs.',
    icon: UserCheck,
    source: 'Verified Delivery Model',
  },
  {
    metric: '4.0 / 5.0★',
    title: 'Client Satisfaction',
    description: 'Publicly verified client reviews praising rapid delivery and real revenue growth.',
    icon: Star,
    source: 'Verified on Trustpilot',
  },
  {
    metric: 'Since 2020',
    title: 'Proven Digital Track Record',
    description: 'Operating globally with dedicated engineering hubs in India and the US.',
    icon: ShieldCheck,
    source: 'Established Company History',
  },
];

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-gray-100 py-8 sm:py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {valueMetrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-5 rounded-xl bg-gray-50/70 border border-gray-200/70 hover:bg-white hover:border-red-200 hover:shadow-md transition-all duration-200 min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight group-hover:text-brand-red transition-colors">
                      {item.metric}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center border border-red-100/60 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="truncate">{item.source}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
