Case Sensitive Paths - Webpack Plugin
==========

This Webpack plugin enforces the entire path of all required modules match the exact case of the actual path on disk.
Using this plugin helps alleviate cases where developers working on OSX, which does not follow strict path case sensitivity,
will cause conflicts with other developers or build boxes running Linux, which does require correctly cased paths.

[Previous](https://gist.github.com/Morhaus/333579c2a5b4db644bd50) [iterations](https://github.com/dcousineau/force-case-sensitivity-webpack-plugin) on this same idea provide the basis for this plugin, but unfortunately do not properly check case on
the entire path. This plugin fixes that. Example output:

> ERROR in ./src/containers/SearchProducts.js
  Module not found: Error: CaseSensitivePathsPlugin: `/Users/example/yourproject/src/components/searchProducts/searchproducts.js` does not match the corresponding path on disk `/Users/example/yourproject/src/components/searchproducts`
   @ ./src/containers/SearchProducts.js 9:22-84

Install
----
    npm install --save-dev case-sensitive-paths-webpack-plugin

Usage
----

    var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

    var webpackConfig = {
        plugins: [
            new CaseSensitivePathsPlugin()
            // other plugins ...
        ]
        // other webpack config ...
    }
    
Want to help?
----
This module could use unit testing, but I'm not sure how to test a Webpack plugin. If you use this module and know how to test it,
I would appreciate a pull request.
   
Thanks & Credit
----
(Daniel Cousineau)[https://github.com/dcousineau] who wrote an [earlier version](https://github.com/dcousineau/force-case-sensitivity-webpack-plugin) of this case-sensitivity plugin
(Alexandre Kirszenberg)[https://github.com/Morhaus] who's [gist](https://gist.github.com/Morhaus/333579c2a5b4db644bd5) formed the basis of both these plugins.
