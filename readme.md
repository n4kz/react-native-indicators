[npm-badge]: https://img.shields.io/npm/v/react-native-indicators.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-indicators
[license-badge]: https://img.shields.io/npm/l/react-native-indicators.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-indicators/master/license.txt
[indicator]: https://facebook.github.io/react-native/docs/activityindicator.html

# react-native-indicators

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Activity indicator collection for React Native

![example](https://cloud.githubusercontent.com/assets/2055622/25563554/ee473a00-2da6-11e7-872e-a53eab2f9f78.gif)

## Features

* Easy to use
* Consistent look and feel on iOS and Android
* Can be used as drop-in replacement for [ActivityIndicator][indicator]
* Configurable appearance and animation
* Native driver based animation
* Pure javascript implementation

## Installation

```bash
npm install --save react-native-indicators
```

## Usage

```javascript
import React, { Component } from 'react';
import {
  DotIndicator,
  BarIndicator,
  BallIndicator,
  WaveIndicator,
  UIActivityIndicator
} from 'react-native-indicators';

class Example extends Component {
  render() {
    return (
      <DotIndicator color='white' />
    );
  }
}
```

## Common properties

 name               | description                   | type     | default
:------------------ |:----------------------------- | --------:|:-------------
 animationEasing    | Animation easing function     | Function | Easing.linear
 animationDuration  | Animation duration in ms      |   Number | 1200
 animationDirection | Animation direction           |   String | forward

Possible values for `animationDirection` are `forward`, `backward` and `reversible`

## BallIndicator properties

 name  | description     | type   | default
:----- |:--------------- | ------:|:------------
 color | Component color | String | rgb(0, 0, 0)
 count | Component count | Number | 8
 size  | Component count | Number | 40

## BarIndicator properties

 name  | description     | type   | default
:----- |:--------------- | ------:|:------------
 color | Component color | String | rgb(0, 0, 0)
 count | Component count | Number | 3

## DotIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 count | Component count     | Number | 4
 size  | Base component size | Number | 16

## UIActivityIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 count | Component count     | Number | 12
 size  | Base component size | Number | 40

## WaveIndicator properties

 name       | description         | type   | default
:---------- |:------------------- | ------:|:------------
 color      | Component color     | String | rgb(0, 0, 0)
 count      | Component count     | Number | 4
 size       | Base component size | Number | 40
 waveFactor | Wave base number    | Number | 0.54
 waveMode   | Wave appearance     | String | fill

Possible values for `waveMode` are `fill` and `outline`

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
