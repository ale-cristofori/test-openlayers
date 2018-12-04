module.exports = function (api) {
    const presets = ["react-app"];
    const plugins = [
        "@babel/plugin-transform-modules-commonjs", 
        "inline-react-svg"
    ];

    /** this is just for minimal working purposes, 
     * for testing larger applications it is
     * advisable to cache the transpiled modules in
     * node_modules/.bin/.cache/@babel/register**/
    api.cache(false); 

    return {
        presets, 
        plugins
    }
};

