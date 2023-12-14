import { View, DimensionValue } from 'react-native'

interface DividerProps {
    width?: DimensionValue
    height?: DimensionValue
    color?: string
    marginBottom?: number
    marginTop?: number
    horizontal?: boolean
}

export function Divider({width, height, color, marginBottom, marginTop, horizontal}: DividerProps) {
    return (
        <View style={{
            flex: 1,
            borderColor: color ?? '#212529',
            height: height ?? 50,
            width: !horizontal ? width ?? '100%' : 3,
            marginBottom: marginBottom ?? 0,
            marginTop: marginTop ?? 0,
            maxHeight: height ?? 0,
            borderBottomWidth: !horizontal ? 3 : 0,
            borderRightWidth: horizontal ? 3 : 0,
        }}/>
    )
}

export function HorizontalDivider({width, height, color, marginBottom, marginTop}: DividerProps) {
    return (
        <View
            style={{
                flex: 1,
                borderColor: color ?? '#212529',
                height: height ?? 25,
                width: width ?? 0,
                marginBottom: marginBottom ?? 10,
                marginTop: marginTop ?? 10,
                maxHeight: height ?? 25,
                maxWidth: width ?? 0,
                borderRightWidth: 1,
            }}
        />
    )
}