# GitHub steps for Arjun SM

1. Sign in to GitHub using Arjun's own account.
2. Create a new **empty** repository (do not initialize it with README, .gitignore, or a license).
3. Open this project folder in VS Code.
4. Open Terminal and run:

```bash
git config --global user.name "Arjun SM"
git config --global user.email "ARJUN_GITHUB_EMAIL"
git init
git add .
git commit -m "Initial commit: add MERN todo project structure"
git branch -M main
git remote add origin <ARJUN_REPOSITORY_HTTPS_URL>
git push -u origin main
```

5. Create `feature/backend`, make and test backend changes, commit, push, and open a pull request into `main`.
6. Merge the backend pull request.
7. Update local main and create `feature/frontend`:

```bash
git checkout main
git pull origin main
git checkout -b feature/frontend
```

8. Make and test frontend changes, commit, push, and open a pull request into `main`.
9. Merge the frontend pull request.
10. Verify the repository, README, screenshots, and final application before submission.

Replace the email and repository URL placeholders with Arjun's own details. If GitHub asks to authenticate, use Arjun's account.
