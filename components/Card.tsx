import {View, type ViewProps, type ViewStyle} from "react-native";

type Props = ViewProps

export function Card ({style, ...rest}: Props) {
    return <View style={[style, styles]} {...rest}/>
}

const styles = {
    backgroundColor: '#FFF',
    borderRadius: 8,
} satisfies ViewStyle
