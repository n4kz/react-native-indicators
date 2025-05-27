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
import { View, Animated } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
class BarIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress }) => {
            const { color: backgroundColor = 'rgb(0, 0, 0)', size = 40, animationDuration = 1200, } = this.props;
            const frames = (60 * animationDuration) / 1000;
            let samples = 0;
            do
                samples += count;
            while (samples < frames);
            const inputRange = Array.from(new Array(samples + 1), (item, index) => index / samples);
            const width = Math.floor(size / 5), height = Math.floor(size / 2), radius = Math.ceil(width / 2);
            const containerStyle = {
                height: size,
                width: width,
                marginHorizontal: radius,
            };
            const topStyle = {
                width,
                height,
                backgroundColor,
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius,
                transform: [
                    {
                        translateY: progress.interpolate({
                            inputRange,
                            outputRange: this.outputRange(+(height - radius) / 2, index, count, samples),
                        }),
                    },
                ],
            };
            const bottomStyle = {
                width,
                height,
                backgroundColor,
                borderBottomLeftRadius: radius,
                borderBottomRightRadius: radius,
                transform: [
                    {
                        translateY: progress.interpolate({
                            inputRange,
                            outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
                        }),
                    },
                ],
            };
            return (<View style={containerStyle} {...{ key: index }}>
        <Animated.View style={topStyle}/>
        <Animated.View style={bottomStyle}/>
      </View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    outputRange(base, index, count, samples) {
        const range = Array.from(new Array(samples), (item, index) => base * Math.abs(Math.cos((Math.PI * index) / (samples - 1))));
        for (let j = 0; j < index * (samples / count); j++) {
            range.unshift(range.pop());
        }
        range.unshift(...range.slice(-1));
        return range;
    }
    render() {
        const _a = this.props, { style } = _a, props = __rest(_a, ["style"]);
        return (<Indicator style={[styles.container, style]} renderComponent={this.renderComponent} {...props}/>);
    }
}
BarIndicator.defaultProps = {
    count: 3,
    color: 'rgb(0, 0, 0)',
    size: 40,
};
export default BarIndicator;
