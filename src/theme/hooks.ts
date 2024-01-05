import { useTheme } from "react-native-paper";
import { CustomTheme } from "./theme";

export const useCustomTheme = () => useTheme<CustomTheme>();