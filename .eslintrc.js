module.exports = {
    "extends": "airbnb-standard",
    "parserOptions": {
        "ecmaVersion": 6,
        "parser": "babel-eslint",
        "ecmaFeatures":{
          "experimentalObjectRestSpread":true
        }
    },
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
        "mocha": true
    },
    "rules": {
        "prefer-arrow-callback": "off",
        "func-names": "off",
        "radix": "off",
        "no-plusplus": "off",
        "object-shorthand": "off",
        "prefer-template": "off",
        "max-len": "off",
        "no-lonely-if": "off",
        "class-methods-use-this": "off",
        "no-empty": "off",
        "handle-callback-err": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "no-else-return":0,
        "no-unused-vars":0,
        "consistent-return":0,
        "eqeqeq":0,
        "no-shadow":0,
        "no-unused-expressions":0,
        "no-mixed-spaces-and-tabs":0,
        "no-tabs":0,
        "comma-dangle":0,
        "no-console":0,
        "no-multiple-empty-lines":0,
        "one-var-declaration-per-line":0,
        "prefer-const":0,
        "quotes":0,
        "prefer-destructuring":0,
        "no-trailing-spaces":0,
        "semi":0,
        "eol-last":0,
    }
};