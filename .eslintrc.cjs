/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },

    // Base config
    extends: ["eslint:recommended", "prettier"],
    plugins: [
        "@typescript-eslint",
        "simple-import-sort",
        "prettier"
    ],
    rules: {
        "prettier/prettier": [
            "warn",
            {
                "semi": false,
                "singleQuote": false,
                "trailingComma": "none",
                "endOfLine": "lf",
                "printWidth": 100,
                "tabWidth": 4,
                "useTabs": false
            }
        ],
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    // Side effect imports.
                    ["^\\u0000"],
                    // Node.js builtins prefixed with `node:`.
                    ["^node:"],
                    // remix infrastructure and envs
                    ["^@remix", "^remix", "^i18n", "i18next$"],
                    // Packages.
                    // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                    ["^@?\\w"],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    // Anything not matched in another group.
                    ["^"],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ["^\\."]
                ]
            }
        ],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports"
            }
        ]
    },

    overrides: [
        // React
        {
            files: ["**/*.{js,jsx,ts,tsx}"],
            plugins: ["react", "jsx-a11y"],
            extends: [
                "plugin:react/recommended",
                "plugin:react/jsx-runtime",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended"
            ],
            settings: {
                react: {
                    version: "detect"
                },
                formComponents: ["Form"],
                linkComponents: [
                    { name: "Link", linkAttribute: "to" },
                    { name: "NavLink", linkAttribute: "to" }
                ]
            },
            rules: {
                "react/prop-types": "off"
            }
        },

        // Typescript
        {
            files: ["**/*.{ts,tsx}"],
            plugins: ["@typescript-eslint", "import"],
            parser: "@typescript-eslint/parser",
            settings: {
                "import/internal-regex": "^@/",
                "import/resolver": {
                    node: {
                        extensions: [".ts", ".tsx"]
                    },
                    typescript: {
                        alwaysTryTypes: true
                    }
                }
            },
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:import/recommended",
                "plugin:import/typescript"
            ]
        },

        // Node
        {
            files: [".eslintrc.js"],
            env: {
                node: true
            }
        }
    ]
}
