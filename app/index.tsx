import { Redirect } from "expo-router";

const Page = () => {
  // Entra diretamente no ecrã principal para poderes testar a app
  return <Redirect href="/(root)/(tabs)/home" />;
};

export default Page;