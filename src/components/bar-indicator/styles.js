import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  indicatorContainer: {
    height: 48,
    width: 16,
    padding: 4,
  },

  indicatorA: {
    height: 20,
    width: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  indicatorB: {
    height: 20,
    width: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
