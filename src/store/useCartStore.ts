import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartResume {
  resumeId: number;
  title: string;
  price: number;
  imageList: { resumeImgPath: string }[];
  sellerNickname: string;
}

interface CartStore {
  resumes: CartResume[];
  addResume: (resume: CartResume) => void;
  removeResume: (resumeId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      resumes: [],
      addResume: (resume) =>
        set((state) => {
          if (state.resumes.some((r) => r.resumeId === resume.resumeId)) {
            return state;
          }
          return { resumes: [...state.resumes, resume] };
        }),
      removeResume: (resumeId) =>
        set((state) => ({
          resumes: state.resumes.filter(
            (resume) => resume.resumeId !== resumeId
          )
        })),
      clearCart: () => set({ resumes: [] }),
      getTotalPrice: () => {
        const state = get();
        return state.resumes.reduce((total, resume) => total + resume.price, 0);
      }
    }),
    {
      name: 'resume-cart-storage'
    }
  )
);
