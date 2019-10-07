[npm-badge]: https://img.shields.io/npm/v/react-native-indicators.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-indicators
[license-badge]: https://img.shields.io/npm/l/react-native-indicators.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-indicators/master/license.txt
[travis-badge]: https://api.travis-ci.org/n4kz/react-native-indicators.svg?branch=master
[travis-url]: https://travis-ci.org/n4kz/react-native-indicators?branch=master
[example-url]: https://user-images.githubusercontent.com/2055622/28246049-e82c70e8-6a1b-11e7-93cc-8aa6d0d19867.gif
[indicator]: https://facebook.github.io/react-native/docs/activityindicator.html
[v014-url]: https://github.com/n4kz/react-native-indicators/releases/tag/0.14.0

# react-native-indicators

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]
[![travis][travis-badge]][travis-url]

Activity indicator collection for React Native

![example][example-url]

## Features

* Easy to use
* Consistent look and feel on iOS and Android
* Can be used as drop-in replacement for [ActivityIndicator][indicator]
* Configurable appearance and animation
* Configurable indicator size
* Native driver based animation
* Pure javascript implementation
* Compatible with RN 0.45+, for older versions use [0.14.0][v014-url]

## Installation

```bash
npm install --save react-native-indicators
```

## Usage

```javascript
import React, { Component } from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
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
 animating          | Animation toggle              |  Boolean | true
 interaction        | Animation is interaction      |  Boolean | true
 hidesWhenStopped   | Hide when not animating       |  Boolean | true

## BallIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 count | Component count     | Number | 8
 size  | Base component size | Number | 40

## BarIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 count | Component count     | Number | 3
 size  | Base component size | Number | 40

## DotIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 count | Component count     | Number | 4
 size  | Base component size | Number | 16

## MaterialIndicator properties

 name       | description           | type   | default
:---------- |:--------------------- | ------:|:------------
 color      | Component color       | String | rgb(0, 0, 0)
 size       | Base component size   | Number | 40
 trackWidth | Indicator track width | Number | size / 10

## PacmanIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 size  | Base component size | Number | 48

## PulseIndicator properties

 name  | description         | type   | default
:----- |:------------------- | ------:|:------------
 color | Component color     | String | rgb(0, 0, 0)
 size  | Base component size | Number | 40

## SkypeIndicator properties

 name     | description             | type   | default
:-------- |:----------------------- | ------:|:------------
 color    | Component color         | String | rgb(0, 0, 0)
 count    | Component count         | Number | 5
 size     | Base component size     | Number | 40
 minScale | Minimum component scale | Number | 0.2
 maxScale | Maximum component scale | Number | 1.0

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

Copyright 2017-2019 Alexander Nazarov. All rights reserved.
