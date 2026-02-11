
import React, { useState } from 'react';
import { UploadCloud, FileText, Download, Trash2, Eye } from 'lucide-react';
import type { Template } from '../../types/index';

const MOCK_TEMPLATES: Template[] = [
    { id: 't1', name: 'Standard Retail Audit v1', fields: [] },
    { id: 't2', name: 'Promotional Compliance Q1', fields: [] },
];

const AdminTemplates: React.FC = () => {
    const [templates] = useState<Template[]>(MOCK_TEMPLATES);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            alert(`Simulating upload for: ${file.name}`);
            // In a real app, this would parse the CSV and send to backend
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Template Management</h2>
                    <p className="text-slate-500">Upload and manage audit questionnaires</p>
                </div>
                <div className="flex gap-3">
                    <a
                        href="#"
                        className="flex items-center gap-2 text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                        onClick={(e) => { e.preventDefault(); alert('Downloading sample CSV...'); }}
                    >
                        <Download className="w-4 h-4" />
                        <span>Sample CSV</span>
                    </a>
                    <label className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 cursor-pointer">
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Template</span>
                        <input type="file" accept=".csv,.xlsx" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500/50 transition-colors group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors" title="View Details">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-semibold text-slate-800 text-lg mb-1">{template.name}</h3>
                        <p className="text-sm text-slate-500">Updated: Today, 10:30 AM</p>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400">
                            <span>15 Questions</span>
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">v1.0</span>
                        </div>
                    </div>
                ))}

                {/* Empty State / Dropzone Placeholder */}
                <label className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group h-full min-h-[160px]">
                    <UploadCloud className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 mb-3 transition-colors" />
                    <span className="font-medium text-slate-600 group-hover:text-emerald-700">Drag & Drop or Click</span>
                    <span className="text-xs text-slate-400 mt-1">to upload new template CSV</span>
                    <input type="file" accept=".csv,.xlsx" className="hidden" onChange={handleFileUpload} />
                </label>
            </div>
        </div>
    );
};

export default AdminTemplates;
