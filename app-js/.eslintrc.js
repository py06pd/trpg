module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended",
    ],
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": 0,
        "no-trailing-spaces": ["error", { "skipBlankLines": true }],
        "keyword-spacing": ["error", { "after": true}],
        "space-before-blocks": ["error", "always"],
        "vue/html-closing-bracket-newline": ["off"],
        "vue/html-closing-bracket-spacing": ["off"],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 2,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/singleline-html-element-content-newline": ["off"],
    },
    "plugins": [
        "html",
    ]
};
