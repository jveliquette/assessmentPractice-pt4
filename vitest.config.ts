import { defineProject } from 'vitest/config'

export default defineProject({
    test: {
        exclude: ['dist/**/*.js'],
        environment: 'node',
    },
})
