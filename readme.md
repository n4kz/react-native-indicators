[npm-badge]: https://img.shields.io/npm/v/react-native-indicators.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-indicators
[license-badge]: https://img.shields.io/npm/l/react-native-indicators.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-indicators/master/license.txt

# react-native-indicators

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Activity indicator collection for React Native

## Installation

```bash
npm install --save react-native-indicators
```

## Usage

```javascript
import React, { Component } from 'react';
import { DotIndicator, WaveIndicator, UIActivityIndicator } from 'react-native-indicators';

class Example extends Component {
  render() {
    return (
      <DotIndicator color='white' />
    );
  }
}
```

## Properties

 name               | description                   | type     | default
:------------------ |:----------------------------- | --------:|:-------------
 animationEasing    | Animation easing function     | Function | Easing.linear
 animationDuration  | Animation duration in ms      |   Number | 1200
 animationDirection | Animation direction           |   String | forward
 count              | Component count               |   Number | 1

Possible values for `animationDirection` are `forward`, `backward` and `reversible`

## Example

```bash
git clone https://github.com/n4kz/react-native-indicators
cd react-native-indicators/example
npm install
npm run ios # or npm run android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
