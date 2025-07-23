import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
};

type ContactFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

type ContactStore = {
  submissions: ContactFormData[];
  hasSubmitted: boolean;
  addSubmission: (submission: ContactFormData) => void;
  resetSubmissions: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      isAuthenticated: () => get().user !== null,
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useContactStore = create<ContactStore>()((set) => ({
  submissions: [],
  hasSubmitted: false,
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [...state.submissions, submission],
      hasSubmitted: true,
    })),
  resetSubmissions: () => set({ submissions: [], hasSubmitted: false }),
}));