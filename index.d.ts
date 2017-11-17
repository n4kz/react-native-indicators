declare module 'react-native-indicators' {
  import { Animated, EasingFunction } from 'react-native';
  import { Component } from 'react';
  interface BaseProps {
    /**
     * Animation easing function
     * @default Easing.linear
     */
    animationEasing?: EasingFunction;

    /**
     * Animation duration in ms
     * @default1200
     */
    animationDuration?: number;
  }

  export interface UIActivityIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 12
     */
    count?: number;
    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class UIActivityIndicator extends Component<
    UIActivityIndicatorProps
    > { }

  export interface BallIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 8
     */
    count?: number;
    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class BallIndicator extends Component<BallIndicatorProps> { }

  export interface BarIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 3
     */
    count?: number;
    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class BarIndicator extends Component<BarIndicatorProps> { }

  export interface DotIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 4
     */
    count?: number;
    /**
     * Base component size
     * @default 16
     */
    size?: number;
  }

  export class DotIndicator extends Component<DotIndicatorProps> { }

  export interface DotIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 4
     */
    count?: number;
    /**
     * Base component size
     * @default 16
     */
    size?: number;
  }

  export class DotIndicator extends Component<DotIndicatorProps> { }

  export interface MaterialIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;

    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class MaterialIndicator extends Component<MaterialIndicatorProps> { }

  export interface PulseIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;

    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class PulseIndicator extends Component<PulseIndicatorProps> { }

  export interface PacmanIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;

    /**
     * Base component size
     * @default 48
     */
    size?: number;
  }

  export class PacmanIndicator extends Component<PacmanIndicatorProps> { }

  export interface PulseIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;

    /**
     * Base component size
     * @default 40
     */
    size?: number;
  }

  export class PulseIndicator extends Component<PulseIndicatorProps> { }

  export interface SkypeIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 5
     */
    count?: number;
    /**
     * Base component size
     * @default 40
     */
    size?: number;
    /**
     * Minimum component scale
     * @default 0.2
     */
    minScale?: number;
    /**
     * Maximum component scale
     * @default 1.0
     */
    maxScale?: number;
  }

  export class SkypeIndicator extends Component<SkypeIndicatorProps> { }

  export interface WaveIndicatorProps extends BaseProps {
    /**
     * Component color
     * @default 'rgb(0, 0, 0)'
     */
    color?: string;
    /**
     * Component count
     * @default 4
     */
    count?: number;
    /**
     * Base component size
     * @default 40
     */
    size?: number;
    /**
     * Minimum component scale
     * @default 0.54
     */
    waveFactor?: number;
    /**
     * Maximum component scale
     * @default 'fill'
     */
    waveMode?: 'fill' | 'outline';
  }

  export class WaveIndicator extends Component<WaveIndicatorProps> { }
}
