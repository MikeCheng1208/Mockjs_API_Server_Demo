const path = require('path');
const webpack = require('webpack');
const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: 'index'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js?[hash:8]',
        publicPath: "/"
    },
    devServer: {
        compress: true,
        port: 3000,
        stats: {
            assets: true,
            cached: false,
            chunkModules: false,
            chunkOrigins: false,
            chunks: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            version: false,
            warnings: false
        },
        proxy: {
            '/api/*': {
                target: 'http://localhost:3001/',
                changeOrigin: true,
            },
        },
    },  
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('src/css'),
            path.resolve('src/html'),
            path.resolve('src/js'),
            path.resolve('src/images'),
            path.resolve('node_modules')
        ],
        extensions: ['.js']
    },
    plugins: [
    ],
    module:{
        rules:[
            {
                test: /\.(html)$/,
                use: 'file-loader?name=[name].[ext]',
                include: path.resolve('src')
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                include: path.resolve('src')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=2000&name=[path][name].[ext]?[hash:8]',
                include: path.resolve('src')
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
                include: path.resolve('src/css')
            }
        ]
    }
};

module.exports = config;