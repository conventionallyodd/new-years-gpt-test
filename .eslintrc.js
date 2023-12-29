module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/recommended", "@vue/airbnb"],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },
    rules: {
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multi-word-component-names": "off",
        "vuejs-accessibility/form-control-has-label": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-console": ["error", { allow: ["warn", "error", "info"] }],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "object-curly-newline": "off",
        quotes: ["error", "double"],
        "no-restricted-syntax": 0,
        "max-len": [
            "error",
            {
                code: 182,
            },
        ],
        "vue/html-self-closing": "off",
    },
    globals: {
        jest: "readonly",
    },
    overrides: [
        {
            files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
            env: {
                jest: true,
            },
        },
    ],
};
