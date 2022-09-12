import { UserConfig } from '@commitlint/types'

export default <UserConfig>{
  extends: ['@commitlint/config-conventional'],

  rules: {
    'subject-case': [0],
    'header-max-length': [2, 'always', 150],
  },
}
