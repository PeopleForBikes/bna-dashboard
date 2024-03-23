const OFF   = 0;    // OFF   or 0 - turn the rule off
const WARN  = 1;    // WARN  or 1 - turn the rule on as a warning (does not affect exit code)
const ERROR = 2;    // ERROR or 2 - turn the rule on as an error (exit code will be 1)


module.exports = {
  root: true,
  extends: 'next/core-web-vitals',
  rules: {
    // convention
    'comma-dangle': [ERROR, {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    indent: [ERROR, 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      ignoreComments: false,
      flatTernaryExpressions: false,
      offsetTernaryExpressions: true,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: [
        'TemplateLiteral *',
        'JSXElement',
        'JSXElement > *',
        'JSXAttribute',
        'JSXIdentifier',
        'JSXNamespacedName',
        'JSXMemberExpression',
        'JSXSpreadAttribute',
        'JSXExpressionContainer',
        'JSXOpeningElement',
        'JSXClosingElement',
        'JSXFragment',
        'JSXOpeningFragment',
        'JSXClosingFragment',
        'JSXText',
        'JSXEmptyExpression',
        'JSXSpreadChild'
      ]
    }],
    quotes: [ERROR, 'single', { allowTemplateLiterals: true }],
    semi: [ERROR, 'always'],

    // imports
    'import/order': [ERROR, {
      groups: [
        ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'object']
      ],
      alphabetize: {
        // order: 'asc',
        caseInsensitive: false
      },
      warnOnUnassignedImports: true
    }],
    'import/newline-after-import': [ERROR, {
      count: 2
    }],
    'import/exports-last': ERROR,
    'import/group-exports': ERROR,
    'import/no-relative-packages': ERROR,

    // react
    'react/no-unescaped-entities': 0
  }
};
