const config = {
    branches: ['main'], // Specify which branches to release from
    plugins: [
      // Plugins to analyze commits and generate release notes
      '@semantic-release/commit-analyzer', // Analyze commits to determine release version
      '@semantic-release/release-notes-generator', // Generate release notes from commit messages
      // Plugin to commit release version and notes to the repository
      ["@semantic-release/git", {
        "assets": ["dist/*.js", "dist/*.js.map"], // Files to include in the release commit
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}" // Commit message template
      }],
      // Plugin to create a GitHub release
      '@semantic-release/github' // Publish the release on GitHub
    ]
  };

  export default config;