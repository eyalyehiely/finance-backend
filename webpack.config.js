// 'use strict';
//
// const path = require('path');
//
// module.exports = {
//     entry: path.resolve('frontend', 'src'),
//     output: {
//         path: path.resolve('frontend', 'assets'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader'
//                 }
//             }
//         ]
//     }
// };
'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'frontend', 'src', 'index.js'), // Adjust the entry point to point to your main file
    output: {
        path: path.resolve(__dirname, 'frontend', 'assets'), // Adjust the output path as needed
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

