
import React, { useState } from 'react';
import { Save, Upload, Plus, Trash2, Layout, FileText, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import type { Client, ReportDefinition } from '../../types/index';

const ClientForm: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState<Partial<Client>>({
        name: '',
        countriesCovered: [],
        geoValidationRequired: false,
        allowMultipleDatasets: false,
        databaseName: '',
        autoMailOnNonCompliance: false,
        sosCalculationWithAssumption: false,
        colorScheme: {
            headerBand: '#1e293b',
            buttonForeground: '#ffffff',
            buttonBackground: '#10b981',
            background: '#f8fafc',
            text: '#0f172a',
        },
        contractPeriods: [],
        reportConfig: {
            reports: [],
            photoGallery: {
                enabled: true,
                allowDownload: true,
                allowZoom: true
            }
        }
    });

    const [newCountry, setNewCountry] = useState('');
    const [selectedCountryForContract, setSelectedCountryForContract] = useState('');

    // Helper to add country
    const addCountry = () => {
        if (newCountry && !formData.countriesCovered?.includes(newCountry)) {
            setFormData(prev => ({
                ...prev,
                countriesCovered: [...(prev.countriesCovered || []), newCountry]
            }));
            setNewCountry('');
        }
    };

    // Helper to update color scheme
    const updateColor = (key: keyof Client['colorScheme'], value: string) => {
        setFormData(prev => ({
            ...prev,
            colorScheme: { ...prev.colorScheme!, [key]: value }
        }));
    };

    // Helper to add report
    const addReport = () => {
        const newReport: ReportDefinition = {
            id: Date.now().toString(),
            name: '',
            fileName: '',
            country: formData.countriesCovered?.[0] || ''
        };
        setFormData(prev => ({
            ...prev,
            reportConfig: {
                ...prev.reportConfig!,
                reports: [...(prev.reportConfig?.reports || []), newReport]
            }
        }));
    };

    // Helper to update report
    const updateReport = (id: string, field: keyof ReportDefinition, value: string) => {
        setFormData(prev => ({
            ...prev,
            reportConfig: {
                ...prev.reportConfig!,
                reports: prev.reportConfig?.reports.map(r => r.id === id ? { ...r, [field]: value } : r) || []
            }
        }));
    };

    // Helper to delete report
    const deleteReport = (id: string) => {
        setFormData(prev => ({
            ...prev,
            reportConfig: {
                ...prev.reportConfig!,
                reports: prev.reportConfig?.reports.filter(r => r.id !== id) || []
            }
        }));
    };

    const handleSave = () => {
        console.log('Saving Client Data:', formData);
        alert('Client saved successfully (Mock)');
        navigate('/admin/clients');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Client Configuration</h2>
                    <p className="text-slate-500">Manage client settings, reports, and audit rules</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/admin/clients')}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-sm shadow-emerald-200"
                    >
                        <Save className="w-4 h-4" />
                        <span>Save Client</span>
                    </button>
                </div>
            </div>

            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Tabs.List className="flex border-b border-slate-200 bg-slate-50/50">
                    <Tabs.Trigger
                        value="general"
                        className={`px-6 py-4 text-sm font-medium transition-all outline-none flex items-center gap-2 ${activeTab === 'general' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Layout className="w-4 h-4" />
                        General Settings
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="reports"
                        className={`px-6 py-4 text-sm font-medium transition-all outline-none flex items-center gap-2 ${activeTab === 'reports' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <FileText className="w-4 h-4" />
                        Report Configuration
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="general" className="p-8 outline-none animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* LEFT COLUMN - General */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Enter client name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Countries Covered</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        placeholder="Add country"
                                        value={newCountry}
                                        onChange={e => setNewCountry(e.target.value)}
                                    />
                                    <button onClick={addCountry} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {formData.countriesCovered?.map(c => (
                                        <span key={c} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full flex items-center gap-2">
                                            {c}
                                            <button onClick={() => setFormData(p => ({ ...p, countriesCovered: p.countriesCovered?.filter(x => x !== c) }))} className="hover:text-red-500">×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                                        checked={formData.geoValidationRequired}
                                        onChange={e => setFormData({ ...formData, geoValidationRequired: e.target.checked })}
                                    />
                                    <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Geographical coordinate Validation Required (15m)</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                                        checked={formData.allowMultipleDatasets}
                                        onChange={e => setFormData({ ...formData, allowMultipleDatasets: e.target.checked })}
                                    />
                                    <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Allow multiple dataset per visit</span>
                                </label>
                            </div>

                            <div className="space-y-6 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Database Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                                        value={formData.databaseName}
                                        onChange={e => setFormData({ ...formData, databaseName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Watermark</label>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-slate-400 italic bg-slate-50">
                                            {formData.watermark || 'No file selected'}
                                        </div>
                                        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 text-sm font-medium">Browse...</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                                        checked={formData.autoMailOnNonCompliance}
                                        onChange={e => setFormData({ ...formData, autoMailOnNonCompliance: e.target.checked })}
                                    />
                                    <span className="text-slate-700 group-hover:text-slate-900 transition-colors">Automatic mail communication on non-compliance</span>
                                </label>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Branding & Contract */}
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 text-sm font-medium">Browse...</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Color Scheme</h3>
                                {[
                                    { label: 'Header Band', key: 'headerBand' },
                                    { label: 'Button Foreground', key: 'buttonForeground' },
                                    { label: 'Button Background', key: 'buttonBackground' },
                                    { label: 'Background', key: 'background' },
                                    { label: 'Text', key: 'text' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between">
                                        <label className="text-sm text-slate-600">{item.label}</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                className="w-8 h-8 rounded cursor-pointer border-0"
                                                value={formData.colorScheme?.[item.key as keyof typeof formData.colorScheme]}
                                                onChange={e => updateColor(item.key as any, e.target.value)}
                                            />
                                            <span className="text-xs text-slate-400 font-mono w-16">
                                                {formData.colorScheme?.[item.key as keyof typeof formData.colorScheme]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all"
                                        checked={formData.sosCalculationWithAssumption}
                                        onChange={e => setFormData({ ...formData, sosCalculationWithAssumption: e.target.checked })}
                                    />
                                    <span className="text-slate-700 group-hover:text-slate-900 transition-colors">SOS calculation with assumptions</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>

                <Tabs.Content value="reports" className="p-8 outline-none animate-in fade-in duration-300 space-y-8">
                    {/* Report Definitions */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-800">Report Definitions</h3>
                            <button
                                onClick={addReport}
                                className="flex items-center gap-2 text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Add Report
                            </button>
                        </div>
                        <div className="border rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-700 font-medium">
                                    <tr>
                                        <th className="px-4 py-3 border-b">Button Name (Caption)</th>
                                        <th className="px-4 py-3 border-b">Filename</th>
                                        <th className="px-4 py-3 border-b">Country</th>
                                        <th className="px-4 py-3 border-b w-20">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {formData.reportConfig?.reports.map((report) => (
                                        <tr key={report.id} className="group hover:bg-slate-50">
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Availability Trends"
                                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400"
                                                    value={report.name}
                                                    onChange={e => updateReport(report.id, 'name', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="report_file.json"
                                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-600 font-mono text-xs"
                                                    value={report.fileName}
                                                    onChange={e => updateReport(report.id, 'fileName', e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <select
                                                    className="bg-transparent border-none focus:ring-0 text-slate-600 w-full"
                                                    value={report.country}
                                                    onChange={e => updateReport(report.id, 'country', e.target.value)}
                                                >
                                                    <option value="">Select Country</option>
                                                    {formData.countriesCovered?.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => deleteReport(report.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {formData.reportConfig?.reports.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">
                                                No reports defined. Click "Add Report" to configure.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Photo Gallery Settings */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm text-emerald-600">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Photo Gallery Configuration</h3>
                                <p className="text-sm text-slate-500 mb-4">Configure how audit photos are displayed and shared with the client.</p>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            checked={formData.reportConfig?.photoGallery.enabled}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                reportConfig: { ...prev.reportConfig!, photoGallery: { ...prev.reportConfig!.photoGallery, enabled: e.target.checked } }
                                            }))}
                                        />
                                        <span className="text-slate-700 text-sm">Enable Photo Gallery Module</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            checked={formData.reportConfig?.photoGallery.allowDownload}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                reportConfig: { ...prev.reportConfig!, photoGallery: { ...prev.reportConfig!.photoGallery, allowDownload: e.target.checked } }
                                            }))}
                                        />
                                        <span className="text-slate-700 text-sm">Allow Bulk Download (Zip by Cycle/Visit)</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            checked={formData.reportConfig?.photoGallery.allowZoom}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                reportConfig: { ...prev.reportConfig!, photoGallery: { ...prev.reportConfig!.photoGallery, allowZoom: e.target.checked } }
                                            }))}
                                        />
                                        <span className="text-slate-700 text-sm">Enable Zoom In/Out Interface</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default ClientForm;
