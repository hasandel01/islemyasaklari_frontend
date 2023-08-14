// tokenStore.js
import {create} from 'zustand';

const useTokenStore = create((set) => ({
    token: null,
    setToken: (newToken) => set({ token: newToken }),
    getToken: () => useTokenStore.getState().token,
}));

export default useTokenStore;
