
import React, { useState } from 'react';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import type { Visit } from '../../types/index';
import { useNavigate } from 'react-router-dom';

const MOCK_VISITS: Visit[] = [
    { id: '1', storeId: '1', auditorId: 'a1', date: '2024-03-20', status: 'planned', templateId: 't1', cycleId: 'c1', visitNumber: 1 },
    { id: '2', storeId: '2', auditorId: 'a1', date: '2024-03-20', status: 'in-progress', templateId: 't2', cycleId: 'c1', visitNumber: 1 },
    { id: '3', storeId: '3', auditorId: 'a1', date: '2024-03-19', status: 'completed', templateId: 't1', cycleId: 'c1', visitNumber: 1 },
];

// Mock store lookup for demo
const STORE_NAMES: Record<string, string> = {
    '1': 'Walmart Supercenter',
    '2': '7-Eleven',
    '3': 'Carrefour',
};

const AuditVisits: React.FC = () => {
    const navigate = useNavigate();
    const [visits] = useState<Visit[]>(MOCK_VISITS);
    const [filter, setFilter] = useState('all');

    const getStatusColor = (status: Visit['status']) => {
        switch (status) {
            case 'planned': return 'bg-blue-100 text-blue-700';
            case 'in-progress': return 'bg-amber-100 text-amber-700';
            case 'completed': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const filteredVisits = visits.filter(v => filter === 'all' || v.status === filter);

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">My Visits</h2>
                <span className="text-sm text-slate-500">{new Date().toLocaleDateString()}</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
                {['all', 'planned', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Visit List */}
            <div className="space-y-4">
                {filteredVisits.map((visit) => (
                    <div key={visit.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-slate-800">{STORE_NAMES[visit.storeId]}</h3>
                                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>123 Main St, City</span>
                                </div>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(visit.status)}`}>
                                {visit.status.replace('-', ' ')}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Clock className="w-4 h-4" />
                                <span>ETA: 10:00 AM</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/auditor/form/${visit.id}`);
                                }}
                                className="flex items-center gap-1 text-emerald-600 font-medium text-sm group-hover:translate-x-1 transition-transform"
                            >
                                <span>Start Audit</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditVisits;
