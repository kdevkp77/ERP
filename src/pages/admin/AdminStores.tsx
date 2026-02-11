
import React, { useState } from 'react';
import { UploadCloud, Search, MapPin, Store as StoreIcon, MoreHorizontal } from 'lucide-react';
import type { Store } from '../../types/index';

const MOCK_STORES: Store[] = [
    { id: '1', name: 'Walmart Supercenter', address: '123 Main St', city: 'Bentonville', state: 'AR', country: 'USA', channel: 'Hypermarket', virtualChannelId: 'A', requiredVisits: 2 },
    { id: '2', name: '7-Eleven', address: '456 Market St', city: 'Tokyo', state: 'Tokyo', country: 'Japan', channel: 'Convenience', virtualChannelId: 'B', requiredVisits: 4 },
    { id: '3', name: 'Carrefour', address: '789 Rue de Paris', city: 'Paris', state: 'Ile-de-France', country: 'France', channel: 'Supermarket', virtualChannelId: 'A', requiredVisits: 2 },
];

const AdminStores: React.FC = () => {
    const [stores] = useState<Store[]>(MOCK_STORES);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Store Management</h2>
                    <p className="text-slate-500">Manage retail outlets and locations</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <UploadCloud className="w-4 h-4" />
                        <span>Import CSV</span>
                    </button>
                    <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">
                        <StoreIcon className="w-4 h-4" />
                        <span>Add Store</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search stores by name, city, or channel..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                            <option>Filter by Country</option>
                            <option>USA</option>
                            <option>Japan</option>
                            <option>France</option>
                        </select>
                    </div>
                </div>

                {stores.map((store) => (
                    <div key={store.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500/50 transition-colors group relative">
                        <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-xl">
                                {store.virtualChannelId}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-lg">{store.name}</h3>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                                        {store.channel}
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                                        Max Visits: {store.requiredVisits}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span>{store.address}, {store.city}</span>
                            </div>
                            <div className="pl-6 border-l-2 border-slate-100 ml-2">
                                <p>{store.state}, {store.country}</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400">
                            <span>Virtual Channel: {store.virtualChannelId}</span>
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Score: 92%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStores;
