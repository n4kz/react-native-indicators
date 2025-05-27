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
class PacmanIndicator extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.renderBlock = ({ index, count, progress, }) => {
            const { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;
            const transform = [
                {
                    translateX: progress.interpolate({
                        inputRange: [0.5, 1],
                        outputRange: [0, size / (react_native_1.I18nManager.isRTL ? 4 : -4)],
                        extrapolate: "clamp",
                    }),
                },
            ];
            const style = {
                position: "absolute",
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
                        extrapolate: "clamp",
                    }),
                });
                style.opacity = progress.interpolate({
                    inputRange: [0, 0.25],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                });
            }
            return <react_native_1.Animated.View style={style} key={index}/>;
        };
        this.renderComponent = ({ index, count, progress, }) => {
            const { size = 48, color: backgroundColor = "rgb(0, 0, 0)" } = this.props;
            if (index > 1) {
                return this.renderBlock({ index, count, progress });
            }
            const hf = size / 2;
            const qr = size / 4;
            const pacmanStyle = {
                position: "absolute",
                top: qr,
                left: 0,
                width: hf,
                height: hf,
                transform: [
                    {
                        rotate: progress.interpolate({
                            inputRange: [0, 0.67, 1],
                            outputRange: index ^ (react_native_1.I18nManager.isRTL ? 1 : 0)
                                ? ["0deg", "45deg", "0deg"]
                                : ["0deg", "-45deg", "0deg"],
                            extrapolate: "clamp",
                        }),
                    },
                ],
            };
            const containerStyle = Object.assign({ overflow: "hidden", width: hf, height: qr, backgroundColor }, (index
                ? {
                    top: qr,
                    borderBottomLeftRadius: qr,
                    borderBottomRightRadius: qr,
                }
                : {
                    borderTopLeftRadius: qr,
                    borderTopRightRadius: qr,
                }));
            return (<react_native_1.Animated.View style={pacmanStyle} key={index}>
        <react_native_1.Animated.View style={containerStyle}/>
      </react_native_1.Animated.View>);
        };
        this.renderComponent = this.renderComponent.bind(this);
    }
    render() {
        const _a = this.props, { style, size = 48 } = _a, props = __rest(_a, ["style", "size"]);
        const indicatorStyle = {
            width: size * 1.25,
            height: size,
        };
        return (<react_native_1.View style={[styles_1.default.container, style]}>
        <indicator_1.default style={indicatorStyle} renderComponent={this.renderComponent} {...props} count={5}/>
      </react_native_1.View>);
    }
}
PacmanIndicator.defaultProps = {
    animationDuration: 600,
    color: "rgb(0, 0, 0)",
    size: 48,
};
exports.default = PacmanIndicator;
