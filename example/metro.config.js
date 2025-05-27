/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add the parent directory to the watch folders
config.watchFolders = [path.resolve(__dirname, '..')];

// Configure resolver to find modules in parent directory
if (config.resolver) {
    config.resolver.nodeModulesPaths = [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../node_modules'),
    ];
}

module.exports = config; 