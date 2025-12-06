import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store global de CALQ con Zustand
 * Gestiona tema, auth, premium status, etc.
 */
export const useCalqStore = create(
  persist(
    (set, get) => ({
      // Tema
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // User & Auth
      user: null,
      isPremium: false,
      setUser: (user) => set({ user, isPremium: user?.premium || false }),
      logout: () => set({ user: null, isPremium: false }),
      
      // IA Query Limits
      aiQueriesUsed: 0,
      aiQueriesLimit: 20, // Gratis: 20/día
      incrementAiQueries: () => {
        const current = get().aiQueriesUsed;
        set({ aiQueriesUsed: current + 1 });
      },
      resetAiQueries: () => set({ aiQueriesUsed: 0 }),
      canUseAi: () => {
        const { isPremium, aiQueriesUsed, aiQueriesLimit } = get();
        return isPremium || aiQueriesUsed < aiQueriesLimit;
      },
      
      // Features toggles
      showGraphs: false,
      toggleGraphs: () => set((state) => ({ showGraphs: !state.showGraphs })),
      
      showStepBySte: false,
      toggleStepByStep: () => set((state) => ({ showStepByStep: !state.showStepByStep })),
      
      // Modal states
      showUpgradeModal: false,
      setShowUpgradeModal: (show) => set({ showUpgradeModal: show }),
      
      showAuthModal: false,
      setShowAuthModal: (show) => set({ showAuthModal: show }),
    }),
    {
      name: 'calq-storage',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        isPremium: state.isPremium,
      }),
    }
  )
);

// Hook para resetear queries diariamente
export const useDailyReset = () => {
  const resetAiQueries = useCalqStore((state) => state.resetAiQueries);
  
  React.useEffect(() => {
    const lastReset = localStorage.getItem('calq_last_reset');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      resetAiQueries();
      localStorage.setItem('calq_last_reset', today);
    }
  }, [resetAiQueries]);
};
