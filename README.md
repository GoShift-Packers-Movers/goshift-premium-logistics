# Welcome to your GoShift website

## Project info

This is the marketing / web frontend for GoShift.

## How can I edit this code?

You can work locally using your preferred IDE.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this Vite/React app to any static hosting provider (e.g. Vercel, Netlify, Cloudflare Pages, or your own infrastructure). Build with:

```sh
npm run build
```

and serve the contents of the `dist` folder.

## Pricing and offers (optional)

The Price Calculator and Offers page can use live pricing and coupons from the admin panel. Set `VITE_APP_WEBSITE_API_URL` to your Cloud Functions base URL (e.g. `https://us-central1-YOUR_PROJECT.cloudfunctions.net`). If unset, the site uses fallback estimates and static offers.

## Live chat (Tawk.to)

The site uses a static chatbot by default. To use **Tawk.to** live chat instead:

1. Create a Tawk.to account and add a Chat Widget (Administration → Channels → Chat Widget).
2. From the widget’s embed code or Direct Chat Link, copy your **Property ID** and **Widget ID**.
3. In `website/.env` add:
   ```env
   VITE_TAWK_PROPERTY_ID=your_property_id
   VITE_TAWK_WIDGET_ID=default
   ```
4. Restart the dev server or rebuild. The Tawk.to widget will replace the static chatbot.

If these env vars are not set, the static chatbot is shown.

## Using Tawk.to in Customer / Driver mobile apps

You can use the same Tawk.to property for Help & Support in your Flutter customer and driver apps:

- **Flutter packages:** Use a package such as `flutter_tawk_to_plus` or `flutter_tawk_to_chat` (pub.dev). They embed the Tawk.to chat in a WebView and support visitor name/email and optional secure-mode hash.
- **Flow:** From your app’s Help & Support screen, open a full-screen chat (e.g. via `Tawk()` widget with your Tawk Direct Chat Link or property/widget IDs). Users get the same live chat as on the website, and agents see one unified Tawk.to dashboard.
- **Same property:** Use the same Tawk.to property (and widget) as the website so all channels (website, customer app, driver app) are in one place.
