
import React, { useState } from 'react';
import { Camera, Check, ChevronLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_FIELDS = [
    { id: 'f1', label: 'Availability (%)', type: 'number', required: true, category: 'Availability' },
    { id: 'f2', label: 'Shelf Space (cm)', type: 'number', required: true, category: 'Share of Shelf' },
    { id: 'f3', label: 'Promotion Active?', type: 'boolean', required: false, category: 'Promotion' },
    { id: 'f4', label: 'Competitor Brand Visible?', type: 'boolean', required: false, category: 'Competition' },
    { id: 'f5', label: 'Shelf Photo', type: 'photo', required: true, category: 'Evidence' },
];

const AuditForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Availability');

    // Group fields by category
    const groupedFields = MOCK_FIELDS.reduce((acc, field) => {
        const cat = field.category || 'General';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(field);
        return acc;
    }, {} as Record<string, typeof MOCK_FIELDS>);

    const toggleCategory = (category: string) => {
        setExpandedCategory(prev => prev === category ? null : category);
    };

    const handleInputChange = (fieldId: string, value: any) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
        if (errors[fieldId]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
    };

    const handlePhotoUpload = (fieldId: string) => {
        // Navigate to camera or open file picker (simulated)
        const mockUrl = 'https://source.unsplash.com/random/400x300';
        handleInputChange(fieldId, mockUrl);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        MOCK_FIELDS.forEach(field => {
            if (field.required && !formData[field.id]) {
                newErrors[field.id] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Audit Submitted Successfully!');
            navigate('/auditor');
        }
    };

    return (
        <div className="max-w-md mx-auto relative pb-32">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-slate-200 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-slate-800">Walmart - Audit</h1>
                <div className="w-8" /> {/* spacer */}
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-6">
                {Object.entries(groupedFields).map(([category, fields]) => (
                    <div key={category} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                        <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors ${expandedCategory === category ? 'bg-emerald-50 text-emerald-700' : 'bg-white text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <span>{category}</span>
                            <ChevronLeft className={`w-5 h-5 transition-transform ${expandedCategory === category ? '-rotate-90' : 'rotate-180 text-slate-400'}`} />
                        </button>

                        {expandedCategory === category && (
                            <div className="p-4 space-y-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                {fields.map((field) => (
                                    <div key={field.id} className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>

                                        {field.type === 'number' && (
                                            <input
                                                type="number"
                                                className={`w-full p-3 rounded-xl border ${errors[field.id] ? 'border-red-300 bg-red-50' : 'border-slate-200'} focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all`}
                                                placeholder="0"
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        )}

                                        {field.type === 'boolean' && (
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange(field.id, true)}
                                                    className={`flex-1 py-3 rounded-xl border font-medium transition-all ${formData[field.id] === true
                                                        ? 'bg-emerald-600 text-white border-emerald-600'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange(field.id, false)}
                                                    className={`flex-1 py-3 rounded-xl border font-medium transition-all ${formData[field.id] === false
                                                        ? 'bg-red-600 text-white border-red-600'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    No
                                                </button>
                                            </div>
                                        )}

                                        {field.type === 'photo' && (
                                            <div
                                                onClick={() => handlePhotoUpload(field.id)}
                                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${formData[field.id]
                                                    ? 'border-emerald-500 bg-emerald-50'
                                                    : errors[field.id]
                                                        ? 'border-red-300 bg-red-50'
                                                        : 'border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {formData[field.id] ? (
                                                    <div className="relative w-full h-32">
                                                        <img src={formData[field.id]} alt="Evidence" className="w-full h-full object-cover rounded-lg" />
                                                        <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                                                            <Check className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Camera className={`w-8 h-8 mb-2 ${errors[field.id] ? 'text-red-400' : 'text-slate-400'}`} />
                                                        <span className={`text-sm font-medium ${errors[field.id] ? 'text-red-500' : 'text-slate-500'}`}>Tap to take photo</span>
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {errors[field.id] && (
                                            <div className="flex items-center gap-1 text-red-500 text-sm animate-in slide-in-from-top-1">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors[field.id]}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-200 pb-safe z-20">
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 active:scale-[0.98] transition-all"
                    >
                        Submit Audit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuditForm;
