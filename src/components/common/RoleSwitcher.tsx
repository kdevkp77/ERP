
import React from 'react';
import { useRole } from '../../contexts/RoleContext';
import type { UserRole } from '../../types';
import { ChevronDown, ShieldCheck } from 'lucide-react';

const roles: UserRole[] = ['admin', 'supervisor', 'auditor', 'client'];

const RoleSwitcher: React.FC = () => {
    const { role, setRole } = useRole();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors border border-slate-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium capitalize">{role}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 z-50">
                    {roles.map((r) => (
                        <button
                            key={r}
                            className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-slate-700 transition-colors ${role === r ? 'text-emerald-400 bg-slate-700/50' : 'text-slate-300'
                                }`}
                            onClick={() => {
                                setRole(r);
                                setIsOpen(false);
                            }}
                        >
                            {r} View
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoleSwitcher;
