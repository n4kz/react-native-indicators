[npm-badge]: https://img.shields.io/npm/v/react-native-indicators.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-indicators
[license-badge]: https://img.shields.io/npm/l/react-native-indicators.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-indicators/master/license.txt

# react-native-indicators

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Activity indicator collection for React Native

## Roadmap

* Bar indicator
* Circle indicator
* Example project

## Installation

```bash
npm install --save react-native-indicators
```

## Usage

```javascript
import React, { Component } from 'react';
import { DotIndicator } from 'react-native-indicators';

class Example extends Component {
  render() {
    return (
      <DotIndicator color='white' />
    );
  }
}
```

## Example

```bash
git clone https://github.com/n4kz/react-native-pages
cd react-native-pages/example
npm install
npm run ios # or npm run android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
