const presets = [
    ["@babel/preset-env", {
        "corejs": 3,
        "useBuiltIns": "usage",
        "modules": "commonjs",
        "targets": {
            "browsers": [
                "Chrome >= 52",
                "FireFox >= 44",
                "Safari >= 7",
                "Explorer >= 10"
            ]
        }
    }]
];
const plugins = ["@babel/plugin-proposal-object-rest-spread"];
module.exports = { presets, plugins };
