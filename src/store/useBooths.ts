import { create } from 'zustand';
import type { Booth } from '../types/booth';
import type DataStore from '@/store/stores';

interface BoothsStore extends DataStore<Booth> {
  data: Booth | null;
  setData: (data: Booth) => void;
}

const useBooths = create<BoothsStore>(set => ({
  data: null,
  setData: data => set(() => ({ data })),
}));

export default useBooths;
