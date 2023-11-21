import * as React from 'react'
import Svg,{ Path } from 'react-native-svg'

export default function HomeIcon ({style, color}: {style?: object, color?: string}) {
    return (
        <Svg fill={color} style={style} viewBox="0 0 20 20" data-testid="HomeIcon">
            <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></Path>
        </Svg>
    )

}