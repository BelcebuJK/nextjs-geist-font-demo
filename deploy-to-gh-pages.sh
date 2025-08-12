#!/bin/bash

# Set git user config to avoid commit errors
git config user.email "user@example.com"
git config user.name "User"

# Build the Next.js app
npm run build

# Check if export script exists, if not, show error and exit
if ! npm run | grep -q export; then
  echo "Error: npm script 'export' not found. Please add 'next export' script to package.json."
  exit 1
fi

# Export the app as static files to the 'out' directory
npm run export

# Check if gh-pages branch exists, if not create it
if git show-ref --quiet refs/heads/gh-pages; then
  echo "gh-pages branch exists"
else
  git checkout --orphan gh-pages
  git rm -rf .
  echo "Initial gh-pages commit" > README.md
  git add README.md
  git commit -m "Initial gh-pages commit"
  git push origin gh-pages
  git checkout -
fi

# Switch to gh-pages branch
git checkout gh-pages

# Remove old files
git rm -rf .

# Copy static files from 'out' directory
cp -r ../out/* .

# Add and commit changes
git add .
git commit -m "Deploy Next.js static site to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to previous branch
git checkout -
