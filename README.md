# Portfolio Website

This is a fully customizable portfolio website built with Angular. You can easily customize it with your own information and host it on any domain.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Customize the portfolio with your information:
   - Update the profile data in `src/app/services/linkedin.service.ts`
   - Set your GitHub username in `src/app/pages/home/home.component.ts`
   - Add your profile picture to the assets folder or use a URL

4. Run the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200/`

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

This will create a `dist/` folder with all the production files.

## Hosting on Any Domain

### Option 1: Traditional Web Hosting

1. Build your application for production:
```bash
ng build --configuration production
```

2. Upload the contents of the `dist/` folder to your web hosting provider using FTP or their upload interface.

3. Make sure your web server is configured to handle Angular's router by redirecting all requests to `index.html`. This might require adding a `.htaccess` file with the following content (for Apache servers):

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 2: GitHub Pages

1. Install the Angular GitHub Pages package:
```bash
npm install -g angular-cli-ghpages
```

2. Build your site with the proper base-href:
```bash
ng build --configuration production --base-href="https://yourusername.github.io/your-repo-name/"
```

3. Deploy to GitHub Pages:
```bash
npx angular-cli-ghpages --dir=dist/browser
```

### Option 3: Netlify

1. Create a `netlify.toml` file in the root of your project:
```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Push your code to GitHub and connect your repository to Netlify.

### Option 4: Vercel

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

## Adding Your Profile Picture

1. Option 1 (Recommended): Add your profile picture to the assets folder
   - Place your profile image in `src/assets/images/profile.jpg`
   - Update the `profilePicture` field in `src/app/services/linkedin.service.ts` to `'assets/images/profile.jpg'`

2. Option 2: Use an external URL
   - Host your image on a service like Imgur, Cloudinary, or any other image hosting service
   - Use the direct URL in the `profilePicture` field in `src/app/services/linkedin.service.ts`

## Customizing Content

All of the portfolio content is centralized in the following files:

1. Personal/Professional information: `src/app/services/linkedin.service.ts`
2. GitHub username: `src/app/pages/home/home.component.ts`
3. Layout and design: Various component HTML and CSS files

## Development Information

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.