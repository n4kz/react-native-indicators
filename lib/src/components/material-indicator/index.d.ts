import React, { PureComponent } from 'react';
import { MaterialIndicatorProps } from '../../types';
interface MaterialIndicatorPropsWithTrackWidth extends MaterialIndicatorProps {
    trackWidth?: number;
}
export default class MaterialIndicator extends PureComponent<MaterialIndicatorPropsWithTrackWidth> {
    static defaultProps: Partial<MaterialIndicatorPropsWithTrackWidth>;
    private renderComponent;
    render(): React.ReactElement;
}
export {};
