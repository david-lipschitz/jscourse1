const path = require('path'); //this includes a built in node variable for the path, with the path package
const HtmlWebpackPlugin = require('html-webpack-plugin');

//module.exports to tell node.js to export this configuration object so that webpack can work with it
//entry point, where webpack will start the bundling, where it will find the dependencies
//output, tells webpack where to save the bundle file, and we need to pass an object here
//mode: 'development': move to the package.json file in "dev ... mode" and "built ... production"
//loaders: eg convert sass to css; or es6 to es5 JavaScript
//plugins: allow us to do complex processing of our web files, so we need 

module.exports = { //object
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'), //must be an absolute path: output path
        filename: 'js/bundle.js' // a standard naming convention, but we have production and dev
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [ //array of plugins
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: { //object for the loaders, with rules, and each loader needs an object
        rules: [
            {
                test: /\.js$/,  //regular expression to test for all js files (ie .js at the end): all the js files will use the Babel loader
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            }
        ]

    }
}