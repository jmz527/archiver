module.exports = {
    target: 'web',
    devtool: '#source-map',
    entry: {
        main: './src/main'
    },
    output: {
        path: './build',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            // babel is configured in `.babelrc`
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.css/, loader: 'style-loader!css-loader' },
            { test: /\.png/, loader: 'url-loader?limit=100000&mimetype=image/png' },
            { test: /\.gif/, loader: 'url-loader?limit=100000&mimetype=image/gif' },
            { test: /\.jpg/, loader: 'file-loader' }
        ]
    }
};
