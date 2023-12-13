import { View, DimensionValue } from 'react-native'

interface DividerProps {
    width?: DimensionValue
}

export default function Divider({width}: DividerProps) {
    return (
        <View style={{
            flex: 1,
            borderBottomColor: '#212529',
            borderBottomWidth: 3,
            maxHeight: 0,
        }}/>
    )
}