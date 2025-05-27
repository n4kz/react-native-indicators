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
import { View, Animated, I18nManager } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
class PacmanIndicator extends PureComponent {
    constructor(props) {
        super(props);
        this.renderBlock = ({ index, count, progress, }) => {
            const { size = 48, color: backgroundColor = 'rgb(0, 0, 0)' } = this.props;
            const transform = [
                {
                    translateX: progress.interpolate({
                        inputRange: [0.5, 1],
                        outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
                        extrapolate: 'clamp',
                    }),
                },
            ];
            const style = {
                position: 'absolute',
                top: size / 2 - size / 16,
                left: size / 2 + size / 16 + ((index - 2) * size) / 4,
                width: size / 8,
                height: size / 8,
                borderRadius: size / 16,
                backgroundColor,
                transform,
            };
            if (index === count - 1) {
                transform.push({
                    scale: progress.interpolate({
                        inputRange: [0, 0.5],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                    }),
                });
                style.opacity = progress.interpolate({
                    inputRange: [0, 0.25],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                });
            }
            return <Animated.View style={style} key={index}/>;
        };
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 48, color: backgroundColor = 'rgb(0, 0, 0)' } = this.props;
            if (index > 1) {
                return this.renderBlock({ index, count, progress });
            }
            const hf = size / 2;
            const qr = size / 4;
            const pacmanStyle = {
                position: 'absolute',
                top: qr,
                left: 0,
                width: hf,
                height: hf,
                transform: [
                    {
                        rotate: progress.interpolate({
                            inputRange: [0, 0.67, 1],
                            outputRange: index ^ (I18nManager.isRTL ? 1 : 0) ?
                                ['0deg', '45deg', '0deg'] :
                                ['0deg', '-45deg', '0deg'],
                            extrapolate: 'clamp',
                        }),
                    },
                ],
            };
            const containerStyle = Object.assign({ overflow: 'hidden', width: hf, height: qr, backgroundColor }, (index ?
                {
                    top: qr,
                    borderBottomLeftRadius: qr,
                    borderBottomRightRadius: qr,
                } :
                {
                    borderTopLeftRadius: qr,
                    borderTopRightRadius: qr,
                }));
            return (<Animated.View style={pacmanStyle} key={index}>
        <Animated.View style={containerStyle}/>
      </Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size = 48 } = _a, props = __rest(_a, ["style", "size"]);
        const indicatorStyle = {
            width: size * 1.25,
            height: size,
        };
        return (<View style={[styles.container, style]}>
        <Indicator style={indicatorStyle} renderComponent={this.renderComponent} {...props} count={5}/>
      </View>);
    }
}
PacmanIndicator.defaultProps = {
    animationDuration: 600,
    color: 'rgb(0, 0, 0)',
    size: 48,
};
export default PacmanIndicator;
