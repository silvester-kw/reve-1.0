import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { UserProvider } from "@/hooks/useUser";
import { PaperProvider } from "react-native-paper";
import { MenuProvider } from "react-native-popup-menu";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function Providers({ children }) {
  const colorScheme = useColorScheme();
  return (
    <UserProvider>
      <MenuProvider>
        <PaperProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            {children}
          </ThemeProvider>
        </PaperProvider>
      </MenuProvider>
    </UserProvider>
  );
}
