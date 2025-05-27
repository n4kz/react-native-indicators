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
class SkypeIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, minScale = 0.2, maxScale = 1.0, color: backgroundColor = 'rgb(0, 0, 0)', animationDuration = 1600, } = this.props;
            const frames = (60 * animationDuration) / 1000;
            const offset = index / (count - 1);
            const easing = Easing.bezier(0.5, offset, 0.5, 1.0);
            const inputRange = Array.from(new Array(frames), (item, index) => index / (frames - 1));
            const outputRange = Array.from(new Array(frames), (item, index) => easing(index / (frames - 1)) * 360 + 'deg');
            const layerStyle = {
                transform: [
                    {
                        rotate: progress.interpolate({ inputRange, outputRange }),
                    },
                ],
            };
            const ballStyle = {
                width: size / 5,
                height: size / 5,
                borderRadius: size / 10,
                backgroundColor,
                transform: [
                    {
                        scale: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                maxScale - (maxScale - minScale) * offset,
                                minScale + (maxScale - minScale) * offset,
                            ],
                        }),
                    },
                ],
            };
            return (<Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle}/>
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
SkypeIndicator.defaultProps = {
    animationDuration: 1600,
    color: 'rgb(0, 0, 0)',
    count: 5,
    size: 40,
    minScale: 0.2,
    maxScale: 1.0,
};
export default SkypeIndicator;
