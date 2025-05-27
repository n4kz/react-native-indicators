"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const indicator_1 = __importDefault(require("../indicator"));
const styles_1 = __importDefault(require("./styles"));
class MaterialIndicator extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 40, color = 'rgb(0, 0, 0)', trackWidth: borderWidth = (size || 40) / 10, animationDuration = 4000, } = this.props;
            const frames = (60 * animationDuration) / 1000;
            const easing = react_native_1.Easing.bezier(0.4, 0.0, 0.7, 1.0);
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
            return (<react_native_1.Animated.View style={styles_1.default.layer} key={index}>
        <react_native_1.Animated.View style={layerStyle}>
          <react_native_1.Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <react_native_1.Animated.View style={viewportStyle}>
              <react_native_1.Animated.View style={containerStyle} collapsable={false}>
                <react_native_1.Animated.View style={lineStyle}/>
              </react_native_1.Animated.View>
            </react_native_1.Animated.View>
          </react_native_1.Animated.View>
        </react_native_1.Animated.View>
      </react_native_1.Animated.View>);
        };
    }
    render() {
        const _a = this.props, { style, size = 40 } = _a, props = __rest(_a, ["style", "size"]);
        const width = size;
        const height = size;
        return (<react_native_1.View style={[styles_1.default.container, style]}>
        <indicator_1.default style={{ width, height }} renderComponent={this.renderComponent} {...props} count={2}/>
      </react_native_1.View>);
    }
}
MaterialIndicator.defaultProps = {
    animationDuration: 4000,
    color: 'rgb(0, 0, 0)',
    size: 40,
};
exports.default = MaterialIndicator;
