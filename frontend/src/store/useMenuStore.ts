import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

type Menu = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

type MenuState = {
    loading: boolean;
    menus: Menu[]; // Changed to an array
    createMenu: (formData: FormData) => Promise<void>;
    editMenu: (menuId: string, formData: FormData) => Promise<void>;
    fetchMenus: () => Promise<void>; // Added fetchMenus method
};

export const useMenuStore = create<MenuState>()(
    persist((set) => ({
        loading: false,
        menus: [], // Initialize as an empty array
        fetchMenus: async () => {
            try {
                const response = await axios.get(API_END_POINT);
                if (response.data.success) {
                    set({ menus: response.data.menus });
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Failed to fetch menus");
            }
        },
        createMenu: async (formData: FormData) => {
            set({ loading: true });
            try {
                const response = await axios.post(API_END_POINT, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.data.success) {
                    toast.success(response.data.message);
                    set((state) => ({ menus: [...state.menus, response.data.menu] })); // Append new menu
                }
                //update Restaurnt;
                useRestaurantStore.getState().addMenuToRestaurant(response.data.menu)
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "An error occurred");
            } finally {
                set({ loading: false });
            }
        },

        editMenu: async (menuId: string, formData: FormData) => {
            set({ loading: true });
            try {
                const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    set((state) => ({
                        menus: state.menus.map((menu) =>
                            menu.id === menuId ? response.data.menu : menu
                        ),
                    })); 
                }
                //update Restaurant menu here
                useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "An error occurred");
            } finally {
                set({ loading: false });
            }
        },
    }), {
        name: "menu-store",
        storage: createJSONStorage(() => localStorage),
    })
);
