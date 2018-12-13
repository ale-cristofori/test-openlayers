require("@babel/polyfill");
require("@babel/register")({
    // Array of ignore conditions, either a regex or a function. (Optional)
    ignore: [
      // When a file path matches this regex then it is **not** compiled
      /node_modules\/(?!(ol)\/)/
  
      // The file's path is also passed to any ignore functions. It will
      // **not** be compiled if `true` is returned.
      //function(filepath) {
        //return filepath !== "/path/to/es6-file.js";
      //},
    ],

    presets : ["react-app"],
    plugins : [
        "@babel/plugin-transform-modules-commonjs", 
        "inline-react-svg",
    ],

    //root: __dirname,
  
    // Optional only regex - if any filenames **don't** match this regex then they
    // aren't compiled
    //only: /my_es6_folder/,
  
    // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`, `.mjs`
    // and .js so you'll have to add them back if you want them to be used again.
    extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  
    // Setting this to false will disable the cache.
    cache: false,
  });
