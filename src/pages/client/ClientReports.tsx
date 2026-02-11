
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';

const KPIS = [
    { id: 1, label: 'Overall Compliance', value: '94.2%', change: '+2.4%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 2, label: 'Store Coverage', value: '87%', change: '+5.1%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 3, label: 'Issues Found', value: '128', change: '-12%', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 4, label: 'Avg. Audit Score', value: '8.8/10', change: '+0.3', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const DATA_TREND = [
    { name: 'Week 1', compliance: 88, coverage: 75 },
    { name: 'Week 2', compliance: 90, coverage: 78 },
    { name: 'Week 3', compliance: 89, coverage: 82 },
    { name: 'Week 4', compliance: 94, coverage: 87 },
];

const DATA_CATEGORY = [
    { name: 'Beverages', score: 95 },
    { name: 'Snacks', score: 88 },
    { name: 'Dairy', score: 92 },
    { name: 'Personal Care', score: 85 },
];

const ClientReports: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Compliance Dashboard</h2>
                <p className="text-slate-500">Real-time performance metrics</p>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {KPIS.map((kpi) => (
                    <div key={kpi.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-transform hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${kpi.bg}`}>
                                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {kpi.change}
                            </span>
                        </div>
                        <h3 className="text-sm font-medium text-slate-500">{kpi.label}</h3>
                        <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Trend Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Performance Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA_TREND}>
                                <defs>
                                    <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCompliance)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Performance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Category Scores</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATA_CATEGORY} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientReports;
