# Bundle Analysis & Optimization

**Date:** 2025-01-27
**Status:** ✅ Setup Complete

---

## Overview

This document outlines bundle analysis setup and optimization strategies for the z-card portfolio website.

---

## Bundle Analyzer Setup ✅

### Installation

```bash
pnpm add -D @next/bundle-analyzer
```

### Configuration

**File:** `next.config.ts`

```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

### Usage

Run bundle analysis:

```bash
pnpm analyze
```

This will:
1. Build the production bundle
2. Generate interactive bundle analysis reports
3. Open in browser automatically

---

## Current Optimizations ✅

### 1. Code Splitting

**Implementation:**
- Lazy loading for `About`, `Projects`, and `Contact` components
- Route-based code splitting (Next.js default)
- Dynamic imports with `next/dynamic`

**Files:**
- `src/app/(site)/page.tsx`

**Benefits:**
- Reduced initial bundle size
- Faster page load times
- Better Core Web Vitals scores

---

### 2. Package Import Optimization

**File:** `next.config.ts`

```typescript
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
}
```

**Benefits:**
- Tree-shaking for icon libraries
- Only imports used icons
- Significant bundle size reduction

---

### 3. Image Optimization

**File:** `next.config.ts`

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Benefits:**
- Modern image formats (AVIF, WebP)
- Responsive image sizes
- Optimized caching

---

### 4. Compression

**File:** `next.config.ts`

```typescript
compress: true,
```

**Benefits:**
- Gzip/Brotli compression
- Reduced transfer sizes
- Faster page loads

---

## Bundle Size Targets

### Initial Load Targets

- **First Load JS:** < 100 KB (gzipped)
- **Total Bundle:** < 300 KB (gzipped)
- **Time to Interactive:** < 3 seconds

### Current Status

Run `pnpm analyze` to see current bundle sizes.

---

## Optimization Strategies

### 1. Lazy Loading Components

**Already Implemented:**
- ✅ Hero section (loaded immediately)
- ✅ About section (lazy loaded)
- ✅ Projects section (lazy loaded)
- ✅ Contact section (lazy loaded)

**Future Opportunities:**
- Lazy load Digital Card modal
- Lazy load QR code component

---

### 2. Tree Shaking

**Already Optimized:**
- ✅ `lucide-react` - only imports used icons
- ✅ `@radix-ui/react-icons` - optimized imports

**Potential:**
- Review other dependencies for tree-shaking opportunities
- Use named imports instead of default imports where possible

---

### 3. Dynamic Imports

**Already Implemented:**
```tsx
const About = dynamic(() => import('./_components/about'), {
  loading: () => <AboutSkeleton />,
})
```

**Benefits:**
- Components loaded on demand
- Reduced initial bundle size
- Better perceived performance

---

### 4. Font Optimization

**File:** `src/app/layout.tsx`

```typescript
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})
```

**Benefits:**
- Font display swap (prevents FOIT)
- Preload for critical fonts
- Fallback fonts for better UX

---

## Monitoring

### Regular Checks

1. **Monthly Bundle Analysis:**
   ```bash
   pnpm analyze
   ```

2. **Check for Large Dependencies:**
   ```bash
   pnpm why <package-name>
   ```

3. **Review Bundle Reports:**
   - Check for duplicate dependencies
   - Identify large chunks
   - Find optimization opportunities

---

## Common Issues & Solutions

### Issue 1: Large Bundle Size

**Symptoms:**
- Slow initial load
- Large first load JS

**Solutions:**
- Lazy load non-critical components
- Use dynamic imports
- Optimize package imports
- Remove unused dependencies

---

### Issue 2: Duplicate Dependencies

**Symptoms:**
- Same package appears multiple times in bundle
- Larger than expected bundle size

**Solutions:**
- Use `pnpm why` to check dependencies
- Resolve version conflicts
- Use `pnpm dedupe` if needed

---

### Issue 3: Unused Code

**Symptoms:**
- Large bundle but minimal functionality

**Solutions:**
- Run ESLint `unused-imports` plugin
- Remove unused dependencies
- Use tree-shaking effectively

---

## Best Practices

### 1. Import Only What You Need

```tsx
// ❌ Bad
import * as Icons from 'lucide-react'

// ✅ Good
import { Mail, ArrowRight } from 'lucide-react'
```

---

### 2. Use Dynamic Imports for Large Components

```tsx
// ❌ Bad
import HeavyComponent from './heavy-component'

// ✅ Good
const HeavyComponent = dynamic(() => import('./heavy-component'))
```

---

### 3. Optimize Third-Party Libraries

- Use lighter alternatives when possible
- Check bundle size before adding dependencies
- Prefer tree-shakeable libraries

---

### 4. Monitor Bundle Size

- Set up bundle size budgets
- Use CI/CD to fail builds if bundle exceeds limits
- Regular audits and optimization

---

## Tools

### Bundle Analysis

- **@next/bundle-analyzer** - Visual bundle analysis
- **webpack-bundle-analyzer** - Alternative tool
- **source-map-explorer** - Detailed analysis

### Performance Monitoring

- **Lighthouse** - Performance audits
- **WebPageTest** - Real-world performance
- **Next.js Analytics** - Production metrics

---

## Future Optimizations

### Potential Improvements

1. **Service Worker:**
   - Cache static assets
   - Offline support
   - Reduced network requests

2. **HTTP/2 Server Push:**
   - Push critical resources
   - Faster initial load

3. **Resource Hints:**
   - `preconnect` for external domains
   - `dns-prefetch` for faster DNS resolution

4. **Code Splitting:**
   - Split vendor chunks
   - Split by route
   - Split large components

---

## Resources

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)

---

## Notes

- Bundle analysis should be run regularly
- Monitor bundle size in CI/CD
- Set up alerts for bundle size increases
- Document optimization decisions

