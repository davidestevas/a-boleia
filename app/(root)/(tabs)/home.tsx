import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/type";

// 1. Utilizador local de teste (substitui o Clerk)
const MOCK_USER = {
  id: "user_local_1",
  firstName: "Condutor",
  emailAddresses: [{ emailAddress: "cliente@aboleia.pt" }],
};

// 2. Histórico local de viagens (substitui a consulta ao PostgreSQL)
const MOCK_RECENT_RIDES: Ride[] = [
  {
    ride_id: 1,
    origin_address: "Cais do Sodré, Lisboa",
    destination_address: "Oeiras, Lisboa",
    origin_latitude: 38.7058,
    origin_longitude: -9.1442,
    destination_latitude: 38.6916,
    destination_longitude: -9.3106,
    ride_time: 22,
    fare_price: 2650,
    payment_status: "paid",
    driver_id: 1,
    user_id: "user_local_1",
    created_at: "2026-10-18 02:30:00.000000",
    driver: {
      first_name: "João",
      last_name: "Silva",
      car_seats: 2,
    },
  },
  {
    ride_id: 2,
    origin_address: "Bairro Alto, Lisboa",
    destination_address: "Parque das Nações, Lisboa",
    origin_latitude: 38.7138,
    origin_longitude: -9.1456,
    destination_latitude: 38.7686,
    destination_longitude: -9.0945,
    ride_time: 18,
    fare_price: 2200,
    payment_status: "paid",
    driver_id: 2,
    user_id: "user_local_1",
    created_at: "2026-10-12 03:15:00.000000",
    driver: {
      first_name: "Miguel",
      last_name: "Costa",
      car_seats: 2,
    },
  },
];

// 3. Destinos rápidos para testar o fluxo sem chave da Google API
const QUICK_DESTINATIONS = [
  {
    label: "Simular: Casa (Oeiras)",
    latitude: 38.6916,
    longitude: -9.3106,
    address: "Oeiras, Lisboa",
  },
  {
    label: "Simular: Parque das Nações",
    latitude: 38.7686,
    longitude: -9.0945,
    address: "Parque das Nações, Lisboa",
  },
  {
    label: "Simular: Cascais",
    latitude: 38.6979,
    longitude: -9.4215,
    address: "Centro de Cascais, Lisboa",
  },
];

const Home = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    (async () => {
      // Define logo uma localização base em Lisboa (Cais do Sodré) para o mapa abrir imediatamente
      setUserLocation({
        latitude: 38.7058,
        longitude: -9.1442,
        address: "Cais do Sodré, Lisboa",
      });

      // Se der permissão de GPS no telemóvel, atualiza para a tua posição real
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0]?.name || "Localização Atual"}, ${address[0]?.region || "Lisboa"}`,
      });
    })();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={MOCK_RECENT_RIDES}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="Sem viagens recentes"
                  resizeMode="contain"
                />
                <Text className="text-sm">Ainda não tens viagens registadas</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Olá, {MOCK_USER.firstName} 👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            {/* Botões de teste local para saltar a necessidade da Google Places API */}
            <View className="mt-3">
              <Text className="text-xs font-JakartaSemiBold text-neutral-500 mb-2">
                MODO DE TESTE LOCAL (Clica para simular pedido de motorista):
              </Text>
              <View className="flex flex-row flex-wrap gap-2">
                {QUICK_DESTINATIONS.map((dest, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDestinationPress(dest)}
                    className="bg-primary-500 px-3 py-2 rounded-full"
                  >
                    <Text className="text-white text-xs font-JakartaBold">
                      {dest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                A tua localização atual
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Viagens Recentes (A Boleia)
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;