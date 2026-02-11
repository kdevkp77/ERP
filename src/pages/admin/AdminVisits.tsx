
import React, { useState } from 'react';
import { Calendar, Plus, Play, Lock, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import type { Cycle, VirtualChannel } from '../../types/index';

// Mock Data for Initial State
const MOCK_CYCLES: Cycle[] = [
    {
        id: 'c1', cycleNo: 1, startDate: '2024-01-01', endDate: '2024-03-31', status: 'active',
        virtualChannels: [
            { id: 'vc1', name: 'A', requiredVisits: 2, activatedVisitCount: 1, status: 'active' },
            { id: 'vc2', name: 'B', requiredVisits: 1, activatedVisitCount: 0, status: 'inactive' },
            { id: 'vc3', name: 'C', requiredVisits: 1, activatedVisitCount: 1, status: 'active' }
        ]
    }
];

const AdminVisits: React.FC = () => {
    const [cycles, setCycles] = useState<Cycle[]>(MOCK_CYCLES);
    const [selectedCycleId, setSelectedCycleId] = useState<string>(MOCK_CYCLES[0].id);

    const currentCycle = cycles.find(c => c.id === selectedCycleId);

    // Helper: Activate Next Visit
    const activateNextVisit = (vcId: string) => {
        if (!currentCycle) return;

        const updatedCycles = cycles.map(cycle => {
            if (cycle.id === currentCycle.id) {
                return {
                    ...cycle,
                    virtualChannels: cycle.virtualChannels.map(vc => {
                        if (vc.id === vcId && vc.activatedVisitCount < vc.requiredVisits) {
                            return { ...vc, activatedVisitCount: vc.activatedVisitCount + 1, status: 'active' as const };
                        }
                        return vc;
                    })
                };
            }
            return cycle;
        });
        setCycles(updatedCycles);
    };

    // Helper: Close Cycle
    const closeCycle = () => {
        if (confirm('Are you sure you want to close this cycle? No further visits can be activated.')) {
            const updatedCycles = cycles.map(cycle =>
                cycle.id === selectedCycleId ? { ...cycle, status: 'closed' as const } : cycle
            );
            setCycles(updatedCycles);
        }
    };

    // Helper: Create New Cycle
    const createCycle = () => {
        const newCycle: Cycle = {
            id: `c${Date.now()}`,
            cycleNo: (cycles.length + 1),
            startDate: new Date().toISOString().split('T')[0],
            endDate: '',
            status: 'active',
            virtualChannels: currentCycle ? [...currentCycle.virtualChannels.map(vc => ({ ...vc, activatedVisitCount: 0, status: 'inactive' as const }))] : []
        };
        setCycles([...cycles, newCycle]);
        setSelectedCycleId(newCycle.id);
    };

    if (!currentCycle) return <div>Loading...</div>;

    return (
        <div className="space-y-8 pb-12">
            {/* Header & Cycle Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Visit Management</h2>
                    <p className="text-slate-500">Manage audit cycles and activation</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                    <select
                        className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
                        value={selectedCycleId}
                        onChange={(e) => setSelectedCycleId(e.target.value)}
                    >
                        {cycles.map(c => (
                            <option key={c.id} value={c.id}>Cycle {c.cycleNo} ({c.status})</option>
                        ))}
                    </select>

                    <div className="h-6 w-px bg-slate-200 mx-2"></div>

                    {currentCycle.status === 'active' ? (
                        <button
                            onClick={closeCycle}
                            className="flex items-center gap-2 text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                        >
                            <Lock className="w-4 h-4" />
                            Close Cycle
                        </button>
                    ) : (
                        <span className="text-slate-400 text-sm flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Closed
                        </span>
                    )}

                    <button
                        onClick={createCycle}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 text-sm font-medium"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        New Cycle
                    </button>
                </div>
            </div>

            {/* Virtual Channel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCycle.virtualChannels.map((vc) => (
                    <div key={vc.id} className={`relative bg-white rounded-xl shadow-sm border-2 transition-all ${vc.status === 'active' ? 'border-emerald-500/20' : 'border-slate-100 opacity-75'}`}>
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${vc.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${vc.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                {vc.status}
                            </span>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-slate-200">
                                    {vc.name}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Virtual Channel {vc.name}</h3>
                                    <p className="text-sm text-slate-500">Max Visits: {vc.requiredVisits}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Progress Bar */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold uppercase text-slate-500 mb-1.5">
                                        <span>Visit Progress</span>
                                        <span>{vc.activatedVisitCount} / {vc.requiredVisits}</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                            style={{ width: `${(vc.activatedVisitCount / vc.requiredVisits) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Area */}
                                <div className="pt-4 border-t border-slate-50">
                                    {currentCycle.status === 'active' ? (
                                        vc.activatedVisitCount < vc.requiredVisits ? (
                                            <button
                                                onClick={() => activateNextVisit(vc.id)}
                                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm shadow-emerald-200 transition-colors flex items-center justify-center gap-2 group"
                                            >
                                                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                                Open Visit {vc.activatedVisitCount + 1}
                                            </button>
                                        ) : (
                                            <div className="w-full py-3 bg-emerald-50 text-emerald-700 rounded-lg font-medium flex items-center justify-center gap-2 cursor-default">
                                                <CheckCircle className="w-5 h-5" />
                                                All Visits Completed
                                            </div>
                                        )
                                    ) : (
                                        <div className="w-full py-3 bg-slate-50 text-slate-400 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed">
                                            <Lock className="w-4 h-4" />
                                            Cycle Closed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex gap-4 text-blue-800">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <div className="space-y-1">
                    <h4 className="font-bold">Logic Explanation</h4>
                    <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
                        <li>Each <strong>Virtual Channel</strong> (A, B, C...) groups stores based on visit plans.</li>
                        <li>Visits must be opened sequentially (1 → 2 → 3).</li>
                        <li>Opening a visit makes it available to auditors immediately for all stores in that channel.</li>
                        <li>Templates and Periods cannot be changed once a visit is active.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminVisits;
