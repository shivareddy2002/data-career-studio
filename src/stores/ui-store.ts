import { create } from "zustand";

/**
 * Global UI state only (never server data, never form state).
 */
type UIState = {
  commandOpen: boolean;
  sidebarOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  commandOpen: false,
  sidebarOpen: true,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));