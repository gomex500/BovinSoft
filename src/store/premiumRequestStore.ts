import { create } from 'zustand';
import { PremiumRequest } from '../interfaces/Admin';
import { createPremiumRequestService, getAllPremiumRequestsService, updatePremiumRequestService } from '../services/premiunRequestServices';

interface IPremiumRequestState {
  premiumRequests: PremiumRequest[];
  getAllPremiumRequests: () => Promise<void>;
  handleUpdatePremiumRequest: (requestId: string, status: "approved" | "rejected") => Promise<void>;
  onApprove: (requestId: string) => Promise<void>;
  onReject: (requestId: string) => Promise<void>;
  createPremiumRequest: (request: PremiumRequest) => Promise<boolean>
}

// Crear el store de premiumRequests
export const usePremiumRequestStore = create<IPremiumRequestState>((set, get) => ({
  premiumRequests: [],
  getAllPremiumRequests: async () => {
    try {
      let premiumRequests = await getAllPremiumRequestsService();
      set({ premiumRequests });  
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  },

  handleUpdatePremiumRequest: async (requestId: string, status: "approved" | "rejected") => {
    let request = {...get().premiumRequests.find(request => request.id === requestId), status, responseDate: new Date().toISOString()}
    if (!request) return;
    console.log(request);
    
    await updatePremiumRequestService(request);
    set({ premiumRequests: get().premiumRequests.map((request) =>
      request.id === requestId ? { ...request, status } : request
    ) })
  },

  onApprove: async (requestId: string) => {
    await get().handleUpdatePremiumRequest(requestId, 'approved')
  },

  onReject: async (requestId: string) => {
    await get().handleUpdatePremiumRequest(requestId, 'rejected')
  },

  createPremiumRequest: async (request: PremiumRequest) => {
    try {
      const data = await createPremiumRequestService(request);
      set({ premiumRequests: [...get().premiumRequests, data] });
      return true;
    } catch (error) {
      console.error('Error fetching premium requests:', error);
      return false;
    }
  },
}));
