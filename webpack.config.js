const webpack = require('webpack');
const data = require('./data');

module.exports = {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: [
        "webpack-dev-server/client?http://0.0.0.0:8080/",
        "webpack/hot/dev-server",
        './main.js'
    ],
    output: {
        devtoolModuleFilenameTemplate: '[resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]',
        path: __dirname,
        filename: 'build.js'
    },
    setup: function(app) {
        app.get('/data', function(req, res) {
            debugger;
            res.json({ custom: 'response' });
        });
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 8080,
        host: "0.0.0.0",
        stats: { colors: true },
        setup: function(app) {
            app.get('/data', function(req, res) {
                res.json(data);
            });
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
