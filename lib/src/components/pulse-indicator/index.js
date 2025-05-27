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
class PulseIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color = 'rgb(0, 0, 0)' } = this.props;
            const pulseStyle = {
                height: size,
                width: size,
                borderRadius: size / 2,
                backgroundColor: color,
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [0, 0.67, 1],
                            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
                        }),
                    },
                ],
                opacity: progress.interpolate({
                    inputRange: [0, 0.67, 1],
                    outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
                }),
            };
            return (<Animated.View style={styles.layer} key={index}>
        <Animated.View style={pulseStyle}/>
      </Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size = 40 } = _a, props = __rest(_a, ["style", "size"]);
        const width = size;
        const height = size;
        return (<View style={[styles.container, style]}>
        <Indicator style={{ width, height }} renderComponent={this.renderComponent} {...props} count={2}/>
      </View>);
    }
}
PulseIndicator.defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    color: 'rgb(0, 0, 0)',
    size: 40,
};
export default PulseIndicator;
