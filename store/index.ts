import { create } from "zustand";
import { DriverStore, LocationStore, MarkerData, UserVehicle } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  // Carro padrão do cliente para teste local:
  userVehicle: {
    id: "car_1",
    model: "Peugeot 208",
    licensePlate: "AA-24-BB",
    transmission: "Manual",
    trunkReady: true,
  },
  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },
  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
  setUserVehicle: (vehicle: UserVehicle) => {
    set(() => ({ userVehicle: vehicle }));
  },
}));