import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

import CustomButton from "@/components/CustomButton";
import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    userVehicle,
    setUserVehicle,
  } = useLocationStore();

  return (
    <RideLayout title="Pedir A Boleia" snapPoints={["85%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-2">Ponto X (Onde está o teu carro)</Text>
        <View className="bg-neutral-100 p-4 rounded-xl">
          <Text className="font-JakartaMedium">{userAddress || "Cais do Sodré, Lisboa"}</Text>
        </View>
      </View>

      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-2">Ponto Z (Destino da viagem)</Text>
        <View className="bg-neutral-100 p-4 rounded-xl">
          <Text className="font-JakartaMedium">{destinationAddress || "Oeiras, Lisboa"}</Text>
        </View>
      </View>

      {/* NOVO BLOCO: Veículo Particular do Cliente e Mala */}
      <View className="my-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <Text className="text-base font-JakartaBold text-blue-900 mb-1">
          O Teu Veículo a Conduzir:
        </Text>
        <Text className="text-sm font-JakartaMedium text-blue-800">
          🚗 {userVehicle.model} ({userVehicle.licensePlate}) • Caixa {userVehicle.transmission}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setUserVehicle({ ...userVehicle, trunkReady: !userVehicle.trunkReady })
          }
          className="mt-3 flex-row items-center"
        >
          <View
            className={`w-5 h-5 rounded mr-2 items-center justify-center ${
              userVehicle.trunkReady ? "bg-green-600" : "bg-neutral-300"
            }`}
          >
            {userVehicle.trunkReady && <Text className="text-white text-xs">✓</Text>}
          </View>
          <Text className="text-xs font-JakartaMedium text-neutral-700">
            Confirmo que a mala tem espaço para a mota dobrável
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title="Escolher Motorista Credenciado"
        onPress={() => {
          if (!userVehicle.trunkReady) {
            alert("Por favor confirma que tens espaço na mala para guardar a mota dobrável do motorista.");
            return;
          }
          router.push(`/(root)/confirm-ride`);
        }}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;