import { configs } from '@eslint/js';
import tseslint, { configs as _configs } from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
    configs.recommended,
{
    files: ['**/*.{js,ts}'],
    languageOptions: {
    parser: tsparser,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    }
    },
    plugins: {
    '@typescript-eslint': tseslint,
    'import': importPlugin
    },
    rules: {
    ..._configs.recommended.rules,
    ..._configs['recommended-requiring-type-checking'].rules,
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
        }
    ],
    '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
        allowExpressions: true
        }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    'import/order': [
        'error',
        {
        groups: [
            'builtin',
            'external',
            'internal'
        ],
        'newlines-between': 'always',
        alphabetize: {
            order: 'asc',
            caseInsensitive: true
        }
        }
    ],
    'no-console': 'warn'
    },
    linterOptions: {
    reportUnusedDisableDirectives: true
    },
    settings: {
    'import/resolver': {
        node: {
        extensions: ['.js', '.ts']
        }
    }
    }
}
];

