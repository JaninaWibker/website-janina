const config = {
  $schema: 'https://unpkg.com/knip@6/schema.json',
  tags: ['-lintignore'],
  workspaces: {
    '.': {
      entry: [
        'posts/**/*.{js,jsx,ts,tsx,mdx}',
        'components/**/*.{ts,tsx}',
        '!packages',
        'mdx.ts',

        // added here because this is still on the TODO list to add a table of contents and thus not worth removing
        // the export
        'utils/posts/table-of-contents.ts',

        // added here to ignore unused exports from this file as this is more of a collection of useful snippets
        // and the benefit of having something already typed out is worth it despite the fact that not all snippets
        // are used all the time
        'utils/types.ts'
      ]
    },
    'packages/*': {
      project: '**/*.ts'
    }
  }
}

export default config
