import jsLint from '@eslint/js'
import stylisticJSPlugin from '@stylistic/eslint-plugin'
import stylisticTSPlugin from '@stylistic/eslint-plugin-ts'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import typescriptLint from 'typescript-eslint'


const lintTS = '@typescript-eslint'
const stylisticTS = '@stylistic/ts'
const stylisticJS = '@stylistic/js'

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 * @link https://eslint.style/rules/js/array-bracket-newline
 * @link https://typescript-eslint.io/rules/
 */
export default typescriptLint.config(
  jsLint.configs.recommended,
  {
    plugins: {
      [lintTS]: typescriptLint.plugin,
      [stylisticTS]: stylisticTSPlugin,
      [stylisticJS]: stylisticJSPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.node,
        BufferEncoding: 'readonly',
      },
      parserOptions: {
        project: null,
      },
    },
  },
  {
    ignores: [
      'node_modules/*',
      'dist/*',
      'gitignore/*',
      '**/.gitignore/*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'warn',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'off',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'off',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-empty-static-block': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'off',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': [
        'off',
        {
          vars: 'local',
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          ignoreClassWithStaticInitBlock: false,
        },
      ],
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-var': 'error',
      'no-with': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-console': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { regex: `../libs/` },
            { regex: `../core/` },
            { regex: `../packages/` },
          ]
        }
      ],

      ['sort-imports']: [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],

      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }],

      // @stylistic/js

      [`${ stylisticJS }/array-bracket-newline`]: [
        'error',
        'consistent',
      ],
      [`${ stylisticJS }/array-bracket-spacing`]: [
        'error',
        'never',
        {
          singleValue: false,
          objectsInArrays: false,
          arraysInArrays: false,
        },
      ],
      [`${ stylisticJS }/array-element-newline`]: ['error', 'consistent'],
      [`${ stylisticJS }/arrow-parens`]: ['error', 'as-needed'],
      [`${ stylisticJS }/arrow-spacing`]: [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      [`${ stylisticJS }/block-spacing`]: ['error', 'always'],
      [`${ stylisticJS }/brace-style`]: [
        'error',
        'stroustrup',
        {
          allowSingleLine: true,
        },
      ],
      [`${ stylisticJS }/comma-dangle`]: [
        'error',
        {
          imports: 'always-multiline',
          exports: 'only-multiline',
          arrays: 'always-multiline',
          objects: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      [`${ stylisticJS }/comma-spacing`]: [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      [`${ stylisticJS }/comma-style`]: ['error', 'last'],
      [`${ stylisticJS }/computed-property-spacing`]: ['error', 'never'],
      [`${ stylisticJS }/dot-location`]: ['error', 'property'],
      [`${ stylisticJS }/eol-last`]: ['error', 'always'],
      [`${ stylisticJS }/function-call-argument-newline`]: ['error', 'consistent'],
      [`${ stylisticJS }/function-call-spacing`]: ['error', 'never'],
      [`${ stylisticJS }/function-paren-newline`]: ['off', 'multiline-arguments'],
      [`${ stylisticJS }/generator-star-spacing`]: [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      [`${ stylisticJS }/implicit-arrow-linebreak`]: ['off', 'beside'],
      [`${ stylisticJS }/indent`]: [
        'error',
        2,
        {
          FunctionDeclaration: { parameters: 'first' },
          FunctionExpression: { parameters: 'first' },
          CallExpression: { arguments: 'first' },
          ArrayExpression: 'first',
          ObjectExpression: 'first',
          ImportDeclaration: 'first',
          VariableDeclarator: 'first',
          MemberExpression: 1,
          SwitchCase: 1,
          flatTernaryExpressions: false,
          ignoredNodes: [
            'TSTypeParameterInstantiation',
            'FunctionExpression',
            'PropertyDefinition[decorators]',
          ],
          ignoreComments: false,
        },
      ],
      [`${ stylisticJS }/key-spacing`]: [
        'error',
        {
          multiLine: {
            afterColon: true,
            beforeColon: false,
          },
        },
      ],
      [`${ stylisticJS }/keyword-spacing`]: [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      [`${ stylisticJS }/line-comment-position`]: [
        'off',
        {
          position: 'above',
        },
      ],
      [`${ stylisticJS }/linebreak-style`]: ['error', 'unix'],
      [`${ stylisticJS }/lines-around-comment`]: [
        'error',
        {
          beforeBlockComment: true,
          afterBlockComment: false,
          allowBlockStart: true,
          allowBlockEnd: true,
          allowClassStart: false,
          allowClassEnd: false,
          allowObjectStart: true,
          allowObjectEnd: false,
          allowArrayStart: false,
          allowArrayEnd: false,
        },
      ],
      [`${ stylisticJS }/lines-between-class-members`]: [
        'error',
        {
          enforce: [
            { blankLine: 'always', prev: 'method', next: 'method' },
            { blankLine: 'always', prev: 'field', next: 'method' },
          ],
        },
        {
          exceptAfterSingleLine: true,
        },
      ],
      [`${ stylisticJS }/max-len`]: [
        'error',
        {
          code: 200,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],
      [`${ stylisticJS }/max-statements-per-line`]: [
        'error',
        {
          max: 2,
        },
      ],
      [`${ stylisticJS }/multiline-comment-style`]: ['error', 'separate-lines'],
      [`${ stylisticJS }/multiline-ternary`]: ['error', 'always-multiline'],
      [`${ stylisticJS }/new-parens`]: ['error', 'always'],
      [`${ stylisticJS }/newline-per-chained-call`]: [
        'error',
        {
          ignoreChainWithDepth: 3,
        },
      ],
      [`${ stylisticJS }/no-confusing-arrow`]: [
        'off',
        {
          allowParens: true,
          onlyOneSimpleParam: true,
        },
      ],
      [`${ stylisticJS }/no-extra-parens`]: ['error', 'all'],
      [`${ stylisticJS }/no-extra-semi`]: 'error',
      [`${ stylisticJS }/no-mixed-operators`]: 'error',
      [`${ stylisticJS }/no-mixed-spaces-and-tabs`]: 'error',
      [`${ stylisticJS }/no-multi-spaces`]: 'error',
      [`${ stylisticJS }/no-multiple-empty-lines`]: [
        'error',
        {
          max: 1,
        },
      ],
      [`${ stylisticJS }/no-tabs`]: 'error',
      [`${ stylisticJS }/no-trailing-spaces`]: 'error',
      [`${ stylisticJS }/no-whitespace-before-property`]: 'error',
      [`${ stylisticJS }/nonblock-statement-body-position`]: [
        'error',
        'beside',
        {
          overrides: {
            while: 'below',
            for: 'below',
          },
        },
      ],
      [`${ stylisticJS }/object-curly-newline`]: [
        'error',
        {
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true },
          ImportDeclaration: { multiline: true },
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
      [`${ stylisticJS }/object-curly-spacing`]: ['error', 'always'],
      [`${ stylisticJS }/object-property-newline`]: [
        'off',
        {
          allowMultiplePropertiesPerLine: true,
          allowAllPropertiesOnSameLine: true,
        },
      ],
      [`${ stylisticJS }/one-var-declaration-per-line`]: 'error',
      [`${ stylisticJS }/operator-linebreak`]: [
        'error',
        'none',
        {
          overrides: {
            '||': 'before',
            '&&': 'before',
            '??': 'before',
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      [`${ stylisticJS }/padded-blocks`]: [
        'error',
        {
          classes: 'always',
        },
      ],
      [`${ stylisticJS }/padding-line-between-statements`]: [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'never',
          prev: ['case', 'default'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: 'import',
        }
      ],
      [`${ stylisticJS }/quote-props`]: ['error', 'as-needed'],
      [`${ stylisticJS }/quotes`]: ['error', 'single'],
      [`${ stylisticJS }/rest-spread-spacing`]: ['error', 'never'],
      [`${ stylisticJS }/semi`]: ['error', 'never'],
      [`${ stylisticJS }/semi-spacing`]: [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      [`${ stylisticJS }/space-before-blocks`]: 'error',
      [`${ stylisticJS }/space-before-function-paren`]: [
        'error',
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],
      [`${ stylisticJS }/space-in-parens`]: ['error', 'never'],
      [`${ stylisticJS }/space-infix-ops`]: 'error',
      [`${ stylisticJS }/space-unary-ops`]: 'error',
      [`${ stylisticJS }/switch-colon-spacing`]: [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      [`${ stylisticJS }/template-curly-spacing`]: ['error', 'always'],
      [`${ stylisticJS }/wrap-iife`]: ['error', 'inside'],
      [`${ stylisticJS }/wrap-regex`]: 'error',
      [`${ stylisticJS }/yield-star-spacing`]: ['error', 'both'],

      // @stylistic/ts

      [`${ stylisticTS }/type-annotation-spacing`]: [
        'error',
        {
          before: false,
          after: true,
          overrides: {
            arrow: {
              before: true,
              after: true,
            },
          },
        },
      ],

      // @typescript-eslint

      [`${ lintTS }/no-duplicate-enum-values`]: 'error',
      [`${ lintTS }/no-unused-vars`]: ['warn'],
      [`${lintTS}/consistent-type-imports`]: [
        'error',
        {
          prefer: 'no-type-imports',
        }
      ],
    },
  },
)
