const ESLINT_RULES = {
    "indent": ["error", 4],
    "semi": ["error", "always"],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "camelcase": ["error"],
    "no-var": ["error"],
    "max-len": "off",
    "curly": ["error", "multi-or-nest"],
    "arrow-parens": "off",
    "comma-dangle": "off",
    "linebreak-style": "off",
    "yoda": "error",
    "no-return-await": "off",
    "space-infix-ops": "error",
    "eol-last": ["error", "always"],
    "no-useless-constructor": "off",
    "switch-colon-spacing": [
        "error", {
            "before": false, 
            "after": true
        }
    ],
    "key-spacing": [
        "error", 
        {
            "beforeColon": false, 
            "afterColon": true
        }
    ],
    "eqeqeq": [
        "error", 
        "always", 
        {
            "null": "ignore"
        }
    ],
    "no-multiple-empty-lines": [
        "error", 
        { 
            "max": 1, 
            "maxEOF": 1 
        }
    ],
    "keyword-spacing": [
        "error", 
        {
            "before": true, 
            "after": true
        }
    ],
    "arrow-spacing": [
        "error", 
        {
            "before": true, 
            "after": true
        }
    ],
    "brace-style": ["error", "stroustrup"],
    "lines-between-class-members": [
        "error", 
        "always", 
        { 
            "exceptAfterSingleLine": true 
        }
    ],
    "object-curly-spacing": [
        "error", 
        "never", 
        { 
            "objectsInObjects": false, 
            "arraysInObjects": false 
        }
    ],
    "space-before-function-paren": [ 
        "error", 
        {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }
    ],
    "sort-imports": [
        "error", 
        {
            "ignoreCase": false,
            "ignoreMemberSort": false,
            "ignoreDeclarationSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
        }
    ]
};
export default ESLINT_RULES;
