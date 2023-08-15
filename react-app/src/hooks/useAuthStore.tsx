import create from 'zustand';

const useAuthStore = create((set) => ({
    token: null,
    setToken: (newToken) => set({ token: newToken }),
}));

export default useAuthStore;
