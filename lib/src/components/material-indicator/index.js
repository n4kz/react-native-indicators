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
class MaterialIndicator extends PureComponent {
    constructor() {
        super(...arguments);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color = 'rgb(0, 0, 0)', trackWidth: borderWidth = (size || 40) / 10, animationDuration = 4000, } = this.props;
            const frames = (60 * animationDuration) / 1000;
            const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
            const sa = 7.5;
            const ea = 30;
            const sequences = 3;
            const rotations = 5;
            const inputRange = Array.from(new Array(frames), (item, frameIndex) => frameIndex / (frames - 1));
            const outputRange = Array.from(new Array(frames), (item, frameIndex) => {
                let progress = (2 * sequences * frameIndex) / (frames - 1);
                const rotation = index ? +(360 - sa) : -(180 - sa);
                const sequence = Math.ceil(progress);
                if (sequence % 2) {
                    progress = progress - sequence + 1;
                }
                else {
                    progress = sequence - progress;
                }
                const direction = index ? -1 : +1;
                return (direction * (180 - (sa + ea)) * easing(progress) + rotation + 'deg');
            });
            const layerStyle = {
                width: size,
                height: size,
                transform: [
                    {
                        rotate: 90 - sa + 'deg',
                    },
                    {
                        rotate: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', 360 * rotations + 'deg'],
                        }),
                    },
                ],
            };
            const viewportStyle = {
                width: size,
                height: size,
                transform: [
                    {
                        translateY: index ? -size / 2 : 0,
                    },
                    {
                        rotate: progress.interpolate({ inputRange, outputRange }),
                    },
                ],
            };
            const containerStyle = {
                width: size,
                height: size / 2,
                overflow: 'hidden',
            };
            const offsetStyle = index ? { top: size / 2 } : null;
            const lineStyle = {
                width: size,
                height: size,
                borderColor: color,
                borderRadius: size / 2,
                borderWidth,
            };
            return (<Animated.View style={styles.layer} key={index}>
        <Animated.View style={layerStyle}>
          <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle}/>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>);
        };
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
MaterialIndicator.defaultProps = {
    animationDuration: 4000,
    color: 'rgb(0, 0, 0)',
    size: 40,
};
export default MaterialIndicator;
