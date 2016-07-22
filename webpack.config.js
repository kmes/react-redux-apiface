const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const node_modules_dir = path.resolve(__dirname, 'node_modules');

const TARGET = process.env.npm_lifecycle_event;
//const TARGET = 'start';
const env = process.env.WEBPACK_ENV;

const PATHS = {
    app: path.resolve(__dirname, 'app/index.js'),
    build: path.resolve(__dirname, 'build'),
    //dist: path.resolve(__dirname, 'build/dist'),

    deployRoot: path.resolve(__dirname, 'deploy'),
    deployDist: path.resolve(__dirname, 'deploy/dist'),
};
process.env.BABEL_ENV = TARGET;

process.env.HOST = process.env.HOST || 'localhost';
//process.env.PORT = process.env.PORT || 3080;

var common = {
    entry: {
        app: PATHS.app
    },
    devtool: 'cheap-module-source-map',
    output: {
        //path: PATHS.dist, //for production
        path: PATHS.deployDist,
        filename: 'app.js', // Notice we use a variable
        publicPath: process.env.npm_config_publicpath
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                //test: /\.(\.min)?\.js$/,
                exclude: node_modules_dir,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: 'body' // Inject all scripts into the body
        }),*/
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            },
            drop_console: TARGET === 'deploy'
        })
    ]
};

if(TARGET === 'build') {
    common['output'] = {
        path: PATHS.build,
        filename: '[name].js', // Notice we use a variable
        publicPath: process.env.npm_config_publicpath
    };
}
else if(TARGET === 'start' || !TARGET) { //dev server
    module.exports = merge(common, {

        output: {
            path: PATHS.build,
            filename: '[name].js', // Notice we use a variable
            publicPath: process.env.npm_config_publicpath
        },

        //devtool: 'eval-source-map',
        devtool: 'cheap-source-map',
        devServer: {
            contentBase: PATHS.build,
            //contentBase: __dirname,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            //warnings: false,

            // display only errors to reduce the amount of output
            stats: 'errors-only',

            // parse host and port from env so this is easy
            // to customize
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true // --save
            })
        ]
    });
}

if(TARGET === 'build' || TARGET === 'deploy') {
    module.exports = merge(common, {});
}