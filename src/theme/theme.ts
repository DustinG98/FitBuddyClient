import { MD3Theme, MD3DarkTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export interface CustomColors extends MD3Colors {
    primary: string;
    lightPrimary: string;
    lightestPrimary: string;
    lightGray: string,
    background: string,
    text: string,
    darkText: string,
    error: string,
    cardBackground: string,
    notificationBackground: string,
    notificationActionText: string,
    notificationText: string,
}

export interface CustomTheme extends MD3Theme {
    colors: CustomColors;
}

export const theme: CustomTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#FFDD00',
        lightPrimary: '#FFED79',
        lightestPrimary: '#FFF8D6',
        lightGray: '#DBDBDB',
        background: '#101214',
        text: '#fff',
        darkText: '#000',
        // light red
        error: '#FF5252',
        // royal blue
        tertiary: '#3A4CB4',
        cardBackground: '#202124',
        notificationBackground: '#FFDD00',
        notificationActionText: '#000',
        notificationText: '#000',
    },
}