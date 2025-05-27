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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
class Indicator extends react_1.PureComponent {
    constructor(props) {
        super(props);
        this.animationState = 0;
        this.savedValue = 0;
        this.startAnimation = () => {
            const { progress } = this.state;
            const { interaction, animationEasing, animationDuration } = this.props;
            if (0 !== this.animationState) {
                return;
            }
            const animation = react_native_1.Animated.timing(progress, {
                duration: animationDuration || 1200,
                easing: animationEasing || react_native_1.Easing.linear,
                useNativeDriver: true,
                isInteraction: interaction,
                toValue: 1,
            });
            react_native_1.Animated.loop(animation).start();
            this.animationState = 1;
        };
        this.stopAnimation = () => {
            const { progress } = this.state;
            if (1 !== this.animationState) {
                return;
            }
            const listener = progress.addListener(({ value }) => {
                progress.removeListener(listener);
                progress.stopAnimation(() => this.saveAnimation(value));
            });
            this.animationState = -1;
        };
        this.saveAnimation = (value) => {
            const { animating } = this.props;
            this.savedValue = value;
            this.animationState = 0;
            if (animating) {
                this.resumeAnimation();
            }
        };
        this.resumeAnimation = () => {
            const { progress } = this.state;
            const { interaction, animationDuration } = this.props;
            if (0 !== this.animationState) {
                return;
            }
            react_native_1.Animated.timing(progress, {
                useNativeDriver: true,
                isInteraction: interaction,
                duration: (1 - this.savedValue) * (animationDuration || 1200),
                toValue: 1,
            }).start(({ finished }) => {
                if (finished) {
                    progress.setValue(0);
                    this.animationState = 0;
                    this.startAnimation();
                }
            });
            this.savedValue = 0;
            this.animationState = 1;
        };
        this.renderComponent = (_item, index) => {
            const { progress } = this.state;
            const { renderComponent, count } = this.props;
            if (typeof renderComponent === "function") {
                return renderComponent({ index, count: count || 1, progress });
            }
            return null;
        };
        /*
         *  0 -> 1
         *    | startAnimation
         *    | resumeAnimation
         *
         *  1 -> -1
         *    | stopAnimation
         *
         * -1 -> 0
         *    | saveAnimation
         */
        this.animationState = 0;
        this.savedValue = 0;
        const { animating } = this.props;
        this.state = {
            progress: new react_native_1.Animated.Value(0),
            hideAnimation: new react_native_1.Animated.Value(animating ? 1 : 0),
        };
    }
    componentDidMount() {
        const { animating } = this.props;
        if (animating) {
            this.startAnimation();
        }
    }
    componentDidUpdate(prevProps) {
        const { animating } = this.props;
        if (animating && !prevProps.animating) {
            this.resumeAnimation();
        }
        if (!animating && prevProps.animating) {
            this.stopAnimation();
        }
        if (animating !== prevProps.animating) {
            const { hideAnimation } = this.state;
            const { hideAnimationDuration: duration } = this.props;
            react_native_1.Animated.timing(hideAnimation, {
                toValue: animating ? 1 : 0,
                duration: duration || 200,
                useNativeDriver: false,
            }).start();
        }
    }
    render() {
        const { hideAnimation } = this.state;
        const _a = this.props, { count, hidesWhenStopped } = _a, props = __rest(_a, ["count", "hidesWhenStopped"]);
        let style = props.style;
        if (hidesWhenStopped) {
            style = [
                ...(Array.isArray(props.style) ? props.style : [props.style]),
                { opacity: hideAnimation },
            ];
        }
        return (<react_native_1.Animated.View {...props} style={style}>
        {Array.from(new Array(count || 1), this.renderComponent)}
      </react_native_1.Animated.View>);
    }
}
Indicator.defaultProps = {
    animationEasing: react_native_1.Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,
    animating: true,
    interaction: true,
    hidesWhenStopped: true,
    count: 1,
};
exports.default = Indicator;
