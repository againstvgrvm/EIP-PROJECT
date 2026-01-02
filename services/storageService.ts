import { Post, UserRole, User } from '../types.ts';
import { MOCK_POSTS } from '../data/mockData.ts';

const USER_KEY = 'buildconnect_session_v3';

export const storageService = {
  getPosts: async (): Promise<Post[]> => {
    return new Promise((resolve) => {
      // Simulation d'un délai réseau pour une UX fluide avec loader
      setTimeout(() => resolve(MOCK_POSTS), 400);
    });
  },

  registerUser: async (userData: any): Promise<User> => {
    return new Promise((resolve) => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: userData.username,
        role: userData.role,
        avatar: `https://i.pravatar.cc/150?u=${userData.username}`
      };
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      setTimeout(() => resolve(newUser), 600);
    });
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
};