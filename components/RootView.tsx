import type {ViewProps, ViewStyle } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useThemeColors} from "@/hooks/useThemeColors";

type Props = ViewProps

export function RootView({style, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <SafeAreaView
            style={[rootStyle, { backgroundColor: colors.tint }, style]}
            {...rest}
        />
    );
}

const rootStyle = {
    flex: 1,
    padding: 4,
} satisfies ViewStyle;
