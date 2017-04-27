import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  indicator: {
    width: 40,
    height: 40,
  },

  wave: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
