
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MapPin, Calendar, Trash2, Edit2 } from 'lucide-react';
import type { Client } from '../../types/index';

const MOCK_CLIENTS: Client[] = [
    {
        id: '1', name: 'Coca Cola', logo: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&h=100&fit=crop', isActive: true,
        countriesCovered: ['USA', 'Canada'], geoValidationRequired: true, allowMultipleDatasets: false,
        colorScheme: { headerBand: '#F40009', buttonForeground: '#ffffff', buttonBackground: '#F40009', background: '#ffffff', text: '#000000' },
        databaseName: 'db_coke_v1', watermark: 'coke_wm.png', contractPeriods: [], autoMailOnNonCompliance: true, sosCalculationWithAssumption: true,
        reportConfig: { reports: [], photoGallery: { enabled: true, allowDownload: true, allowZoom: true } }
    },
    {
        id: '2', name: 'Nestle', logo: 'https://ui-avatars.com/api/?name=Nestle&background=005CA9&color=fff', isActive: true,
        countriesCovered: ['Switzerland', 'France', 'Germany'], geoValidationRequired: true, allowMultipleDatasets: true,
        colorScheme: { headerBand: '#005CA9', buttonForeground: '#ffffff', buttonBackground: '#005CA9', background: '#f8fafc', text: '#333333' },
        databaseName: 'db_nestle_prod', watermark: 'nestle_confidential.png', contractPeriods: [], autoMailOnNonCompliance: false, sosCalculationWithAssumption: false,
        reportConfig: { reports: [], photoGallery: { enabled: true, allowDownload: true, allowZoom: true } }
    },
    {
        id: '3', name: 'Unilever', logo: 'https://ui-avatars.com/api/?name=Unilever&background=1F36C7&color=fff', isActive: false,
        countriesCovered: ['UK', 'Netherlands'], geoValidationRequired: false, allowMultipleDatasets: false,
        colorScheme: { headerBand: '#1F36C7', buttonForeground: '#ffffff', buttonBackground: '#1F36C7', background: '#ffffff', text: '#000000' },
        databaseName: 'db_unilever_archived', watermark: 'unilever_internal.png', contractPeriods: [], autoMailOnNonCompliance: true, sosCalculationWithAssumption: true,
        reportConfig: { reports: [], photoGallery: { enabled: true, allowDownload: true, allowZoom: true } }
    },
];

const AdminClients: React.FC = () => {
    const navigate = useNavigate();
    const [clients] = useState<Client[]>(MOCK_CLIENTS);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Client Management</h2>
                    <p className="text-slate-500">Manage client brands and their configurations</p>
                </div>
                <button
                    onClick={() => navigate('/admin/clients/new')}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Client</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Countries</th>
                            <th className="px-6 py-4">Contract End</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={client.logo} alt={client.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                                        <span className="font-medium text-slate-900">{client.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.isActive
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {client.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <MapPin className="w-3 h-3" />
                                        <span>5 Countries</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>Dec 31, 2024</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminClients;
