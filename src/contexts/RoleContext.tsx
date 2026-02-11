
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';

interface RoleContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    user: User;
}

const defaultUser: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@fieldforce.com',
    role: 'admin',
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<UserRole>('admin');
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        setUser((prev: User) => ({ ...prev, role }));
    }, [role]);

    return (
        <RoleContext.Provider value={{ role, setRole, user }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
