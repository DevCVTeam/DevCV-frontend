import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartResume {
  resumeId: number;
  title: string;
  price: number;
  imageList: { resumeImgPath: string }[];
  sellerNickname: string;
}

interface CartStore {
  resumes: CartResume[];
  directPurchaseItem: CartResume | null;
  addResume: (resume: CartResume) => void;
  removeResume: (resumeId: number) => void;
  clearCart: () => void;
  setDirectPurchaseItem: (resume: CartResume | null) => void;
  getOrderItems: () => CartResume[];
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      resumes: [],
      directPurchaseItem: null,
      addResume: (resume) =>
        set((state) => ({
          resumes: state.resumes.some(
            (item) => item.resumeId === resume.resumeId
          )
            ? state.resumes
            : [...state.resumes, resume]
        })),
      removeResume: (resumeId) =>
        set((state) => ({
          resumes: state.resumes.filter(
            (resume) => resume.resumeId !== resumeId
          )
        })),
      clearCart: () => set({ resumes: [] }),
      setDirectPurchaseItem: (resume) => set({ directPurchaseItem: resume }),
      getOrderItems: () => {
        const state = get();
        return state.directPurchaseItem
          ? [state.directPurchaseItem]
          : state.resumes;
      },
      getTotalPrice: () => {
        const items = get().getOrderItems();
        return items.reduce((total, item) => total + item.price, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
