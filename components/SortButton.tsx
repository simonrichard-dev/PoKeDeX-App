import { StyleSheet, View } from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    return (
        <View style={[styles.button, { backgroundColor: colors.grayWhite }]}></View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
    }
});
