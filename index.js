/* This plugin based on https://gist.github.com/Morhaus/333579c2a5b4db644bd5

Original license:
--------
 The MIT License (MIT)
 Copyright (c) 2015 Alexandre Kirszenberg
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
--------

And it's NPM-ified version: https://github.com/dcousineau/force-case-sensitivity-webpack-plugin
Author Daniel Cousineau indicated MIT license as well but did not include it

The originals did not properly case-sensitize the entire path, however. This plugin resolves that issue.

This plugin license, also MIT:
--------
 The MIT License (MIT)
 Copyright (c) 2016 Michael Pratt
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
--------
*/

var path = require('path');
var fs = require('fs');

function CaseSensitivePathsPlugin() {}

CaseSensitivePathsPlugin.prototype.apply = function(compiler) {
    compiler.plugin('normal-module-factory', function(nmf) {
        nmf.plugin('after-resolve', function(data, done) {

            // This function based on code found at http://stackoverflow.com/questions/27367261/check-if-file-exists-case-sensitive
            // By Patrick McElhaney (No license indicated - Stack Overflow Answer)
            // This version will return with the real name of any incorrectly-cased portion of the path, null otherwise.
            function fileExistsWithCaseSync(filepath) {
                var dir = path.dirname(filepath);
                if (dir === '/' || dir === '.') return;
                var filenames = fs.readdirSync(dir);
                if (filenames.indexOf(path.basename(filepath)) === - 1) {

                    // This could easily be accomplished with various requires, but I want to keep this module thin.
                    var lowercasedFilenames = [];
                    for (var i = 0; i < filenames.length; i++) {
                        lowercasedFilenames.push(filenames[i].toLowerCase());
                    }
                    var index = lowercasedFilenames.indexOf(path.basename(filepath).toLowerCase());
                    return path.join(dir, filenames[index]);
                }
                return fileExistsWithCaseSync(dir);
            }

            // Trim ? off, since some loaders add that to the resource they're attemping to load
            var pathName = data.resource.split('?')[0];
            var realName = fileExistsWithCaseSync(pathName);

            if (realName) {
                done(new Error('CaseSensitivePathsPlugin: `' + pathName + '` does not match the corresponding path on disk `' + realName + '`'));
            } else {
                done(null, data);
            }
        });
    });
};

module.exports = CaseSensitivePathsPlugin;