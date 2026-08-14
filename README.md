# AMEEN.IN — GitHub Pages Ready

This is a cleaned-up Vite + React version of the uploaded AMEEN.IN code.

## Publish directly with GitHub Pages

1. Create a **Public** GitHub repository, e.g. `ameen`.
2. Upload **all files and folders inside this folder** to the repository root.
3. Commit to the `main` branch.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Wait for the `Deploy to GitHub Pages` workflow in the **Actions** tab to finish.
7. Open the URL shown by the workflow. It will normally be:
   `https://YOUR-USERNAME.github.io/ameen/`

The app uses `HashRouter`, so GitHub Pages will not break when navigating between pages.

## Important security note

The original code contains client-side demo passwords. Client-side passwords are NOT secure:
- anyone who can view the published JavaScript can find them;
- this setup is suitable only for a demo/personal prototype;
- use Firebase Authentication or a backend before using real private data.

## Included features

- Login screen
- Productivity Hub with browser-local notes and expense tracker
- Islamic Center notes
- Creative Studio demo
- Best Friends portal demo
- Dark/light mode
- GitHub Pages deployment workflow
