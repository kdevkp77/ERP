
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Grid, FileText, CheckCircle, BarChart, Settings, Users, LogOut, PackageSearch, Calendar } from 'lucide-react';
import RoleSwitcher from '../common/RoleSwitcher';
import { useRole } from '../../contexts/RoleContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { role } = useRole();
    const location = useLocation();

    const getMenuItems = () => {
        switch (role) {
            case 'admin':
                return [
                    { icon: Grid, label: 'Dashboard', path: '/' },
                    { icon: Users, label: 'Clients', path: '/admin/clients' },
                    { icon: PackageSearch, label: 'Stores', path: '/admin/stores' },
                    { icon: FileText, label: 'Templates', path: '/admin/templates' },
                    { icon: Calendar, label: 'Visits', path: '/admin/visits' },
                    { icon: Settings, label: 'Settings', path: '/admin/settings' },
                ];
            case 'supervisor':
                return [
                    { icon: Grid, label: 'Dashboard', path: '/' },
                    { icon: CheckCircle, label: 'Validation', path: '/supervisor/validate' },
                    { icon: Users, label: 'Team', path: '/supervisor/team' },
                ];
            case 'auditor':
                return [
                    { icon: Grid, label: 'My Visits', path: '/auditor/visits' },
                    { icon: CheckCircle, label: 'Completed', path: '/auditor/history' },
                ];
            case 'client':
                return [
                    { icon: BarChart, label: 'Overview', path: '/client/reports' },
                    { icon: FileText, label: 'Reports', path: '/client/reports' },
                    { icon: Settings, label: 'Preferences', path: '/client/preferences' },
                ];
            default:
                return [];
        }
    };

    const navItems = getMenuItems();

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl z-20 transition-all duration-300">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <BarChart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">FieldFlow</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm">
                    <h1 className="text-xl font-semibold text-slate-800 capitalize">
                        {role.replace('-', ' ')} Portal
                    </h1>
                    <div className="flex items-center gap-4">
                        {/* Use context switcher component */}
                        <RoleSwitcher />
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center border border-slate-300">
                            <span className="text-sm font-medium text-slate-600">JD</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
