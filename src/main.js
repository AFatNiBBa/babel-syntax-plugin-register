
const fs = require('fs');
var { __priv } = require('@babel/parser');

// List of the private variables we want to expose, feel free to add more 😉
const desired = [
    "mixinPluginNames",
    "mixinPlugins",
    "tt"
];

// If the exposed private variables container is not present we create it
if (!__priv)
{
    // Gets the path of the babel parser
    const path = require.resolve('@babel/parser');

    // Adds the local variables we need to the exports
    fs.appendFileSync(path, `;\nmodule.exports.__priv = { ${ desired.join(", ") } };`);

    // Deletes the module cache and reloads it
    delete require.cache[path];
    ({ __priv } = require('@babel/parser'));
}

module.exports = function register(name, mix) {
    if (arguments.length === 1)
        [ name, mix ] = [ name.name, name ];

    __priv.mixinPluginNames.push(name);
    __priv.mixinPlugins[name] = mix;

    return {
        name,
        manipulateOptions: (opts, parserOpts) =>
            parserOpts.plugins.push(name)
    };
};