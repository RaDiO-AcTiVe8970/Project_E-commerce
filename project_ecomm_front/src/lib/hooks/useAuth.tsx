'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, LoginDto, RegisterDto } from '@/lib/api/auth';
import { usersApi, UpdateUserDto } from '@/lib/api/users';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateUserDto) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const userData = await authApi.getProfile();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginDto) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Login failed',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await authApi.register(data);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setUser(response.user);
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Registration failed',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      router.push('/auth/login');
    }
  };

  const updateProfile = async (data: UpdateUserDto) => {
    try {
      const updatedUser = await usersApi.updateProfile(data);
      setUser(updatedUser);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update profile',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
