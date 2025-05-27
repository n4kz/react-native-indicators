var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
const floatEpsilon = Math.pow(2, -23);
class WaveIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color = 'rgb(0, 0, 0)', waveFactor = 0.54, waveMode = 'fill', } = this.props;
            const fill = 'fill' === waveMode;
            const factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);
            const waveStyle = {
                height: size,
                width: size,
                borderRadius: size / 2,
                borderWidth: fill ? 0 : Math.floor(size / 20),
                [fill ? 'backgroundColor' : 'borderColor']: color,
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [factor, 1],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                        }),
                    },
                ],
                opacity: progress.interpolate({
                    inputRange: [0, factor, 1],
                    outputRange: [0, 1, 0],
                }),
            };
            return (<Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={waveStyle}/>
      </Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size: width = 40, size: height = 40 } = _a, props = __rest(_a, ["style", "size", "size"]);
        return (<View style={[styles.container, style]}>
        <Indicator style={{ width, height }} renderComponent={this.renderComponent} {...props}/>
      </View>);
    }
}
WaveIndicator.defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,
    waveFactor: 0.54,
    waveMode: 'fill',
    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 40,
};
export default WaveIndicator;
