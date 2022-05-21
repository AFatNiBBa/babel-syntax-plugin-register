
# register-babel-syntax
Hacks the `@babel/parser` module to allow the registration of custom syntax plugins
> Always update to the latest version to have more features and bug fixes (A looot of bug fixes!) <br>
> ```bash
> npm r register-babel-syntax & npm i register-babel-syntax
> ```

## Warning
This module modifies the source code of `@babel/parser`, so ensure that this loads before you require `@babel/core`

## Usage
```js
// Import the register function
const register = require("register-babel-syntax");

// Get the generated plugin infos
const info = register("your-syntax-plugin", baseParser => {
    // The "__priv" object contains the parser's exposed private variables
    // ("tt" is the token's enum)
    const { __priv: { tt } } = require("@babel/parser");

    return class extends baseParser {
        // Do your overrides
    };
});

// Normal babel plugin export
module.exports = function () {
    return {
        ...info

        // The other things you may want to export
    };
};
```

## Useful info
For infos on how you can do a syntax plugin:
- Go to the file `node_modules/@babel/parser/lib/index.js`
- View [this](https://medium.com/@jacobp100/adding-custom-syntax-to-babel-e1a1315c6a90) article, keep in mind the API is changed since
- Look how I did it [here](https://github.com/AFatNiBBa/babel-plugin-syntax-no-parens)