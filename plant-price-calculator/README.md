# Plant Price Calculator

A simple web application to calculate plant prices based on base price, weight, mutations, and traits.

## Features

- Select from 20 different plants
- Enter weight in kilograms
- Choose mutations (Gold or Prismatic)
- Select multiple traits (Dust, Lightning, Rainbow, Terror, Air, Hazy, Cold, Moist)
- Real-time price calculation
- Responsive design with mobile support
- Sticky price display on mobile devices

## Price Formula

```
Price = Base Price × (Weight in kg)² × Mutation Multiplier × Trait Multiplier
```

- **Mutation Multipliers**: None (1x), Gold (20x), Prismatic (50x)
- **Trait Multipliers**: Sum of selected traits, capped at 55
  - Dust: 10, Lightning: 10, Rainbow: 10, Terror: 10
  - Air: 5, Hazy: 5, Cold: 3, Moist: 2

## Development

### Prerequisites

- Node.js 18+ (or 20+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages (Recommended - Free)

#### Option 1: Using gh-pages (Automated)

1. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `plant-price-calculator`
   - **DO NOT** initialize with README, .gitignore, or license

2. **Initialize Git and Push**:
   ```bash
   cd plant-price-calculator
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[YOUR_USERNAME]/plant-price-calculator.git
   git push -u origin main
   ```

3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select `gh-pages` branch
   - Save
   - Your app will be available at: `https://[YOUR_USERNAME].github.io/plant-price-calculator/`

#### Option 2: Manual GitHub Pages Setup

1. Build the project:
   ```bash
   npm run build
   ```

2. Create `gh-pages` branch and push `dist` folder:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. Enable GitHub Pages in repository settings (same as Option 1)

### Alternative Free Hosting Options

#### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts

#### Netlify (Free)
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

#### Cloudflare Pages (Free)
1. Connect GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **styled-components** - CSS-in-JS styling
- **GitHub Pages** - Free hosting

## License

MIT

