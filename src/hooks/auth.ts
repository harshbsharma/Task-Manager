import {create} from 'zustand';

interface TokenStore{
    token:string;
    setToken: (newtoken:string) => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  token: '',
  setToken: (newToken:string) => set({ token: newToken }),
}));

// export default useTokenStore;
