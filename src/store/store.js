import { create } from "zustand";
export const store = create((set, get) => ({
    shiftData: null,
    selectedId: null,
    selectedEmployee: null,
    setShiftData: (shiftData) => set({ shiftData }),
    setSelectedId: (id) => {
        const currentId = get().selectedId;
        if (currentId === id) {
            return;
        }
        set({ selectedId: id });
    },
    setSelectedEmployee: (employee) => {
        const currentEmployee = get().selectedEmployee;
        if (currentEmployee === employee) {
            return;
        }
        set({ selectedEmployee: employee });
    },
}));
