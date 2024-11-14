import { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT: string = "https://food-app-czjb.onrender.com/api/v1/order"; // Corrected typo
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            loading: false,
            orders: [],
            error: null, // Add an error state to track error messages
            createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
                set({ loading: true, error: null }); // Reset loading and error state
                try {
                    const response = await axios.post(
                        `${API_END_POINT}/checkout/create-checkout-session`,
                        checkoutSession,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    // Redirect to the session URL
                    window.location.href = response.data.session.url;
                } catch (error: any) {
                    console.error('Error creating checkout session:', error.message); // Log the error
                    set({ error: error.response?.data?.message || 'An error occurred' }); // Set error state
                } finally {
                    set({ loading: false }); // Ensure loading is false regardless of success or error
                }
            },
            getOrderDetails: async () => {
                set({ loading: true, error: null }); // Reset loading and error state
                try {
                    const response = await axios.get(`${API_END_POINT}/`);
                    set({ orders: response.data.orders });
                } catch (error: any) {
                    console.error('Error fetching order details:', error.message); // Log the error
                    set({ error: error.response?.data?.message || 'An error occurred' }); // Set error state
                } finally {
                    set({ loading: false }); // Ensure loading is false regardless of success or error
                }
            },
        }),
        {
            name: 'order-name', // Name for the storage
            storage: createJSONStorage(() => localStorage), // Storage method
        }
    )
);
