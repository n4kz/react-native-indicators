import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    layer: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { justifyContent: 'flex-start', alignItems: 'center' }),
});
