git checkout build_files
git merge main && npm run build && git add -A && git commit -m "updating build files" && git push && git checkout main