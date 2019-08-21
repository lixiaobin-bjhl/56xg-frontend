// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    globals: {
        cc: false
    },
    extends: [
        'eslint-config-alloy/typescript'
    ],
    // add your custom rules here
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 取消分号
        '@typescript-eslint/semi': ['error', 'never'],
        // 'semi': ['error', 'never'],
        // 关闭强制使用"==="
        'eqeqeq': 'off',
        // 允许使用for-in
        'guard-for-in': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/explicit-function-return-type': [
            'off', 
            {
                allowExpressions: true, 
                allowTypedFunctionExpressions: true,
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/camelcase': ['off', {properties: 'always'}],
        '@typescript-eslint/no-unused-vars': ['error', {
            'vars': 'all',
            'args': 'none',
            'ignoreRestSiblings': true,
        }],
        "react-native/no-color-literals": 0,
        "react-native/sort-styles": 0,
        "react-native/no-inline-styles":0,
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        "react-native/no-color-literals": 0,
        "react-native/sort-styles": 0,
        "react-native/no-inline-styles":0,
        "@typescript-eslint/no-angle-bracket-type-assertion": 0,
        "@typescript-eslint/no-object-literal-type-assertion": 0,
        "@typescript-eslint/no-triple-slash-reference": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/prefer-interface": 0
    }
}
