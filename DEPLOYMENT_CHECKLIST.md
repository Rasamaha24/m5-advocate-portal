# Cloudflare + Netlify Deployment Checklist

## Pre-Deployment Fixes Applied

✅ **Added `netlify.toml`** - Essential configuration for proper SPA routing
✅ **Updated Vite configuration** - Optimized for Cloudflare proxy compatibility  
✅ **Added debug utilities** - For production troubleshooting
✅ **Verified `_redirects` file** - Ensures SPA routing works correctly

## Common Causes of Blank Pages (FIXED)

### 1. Missing SPA Redirect Configuration
- **Problem**: Direct navigation to routes (e.g., `/dashboard`) would show 404
- **Solution**: `netlify.toml` with proper `[[redirects]]` configuration

### 2. Caching Issues with Cloudflare
- **Problem**: Outdated assets served due to aggressive caching
- **Solution**: Cache-control headers in `netlify.toml`

### 3. Asset Path Issues
- **Problem**: Assets not loading due to incorrect base URL
- **Solution**: Explicit `base: "/"` in `vite.config.ts`

### 4. Build Configuration Issues
- **Problem**: Incorrect build output or missing files
- **Solution**: Proper build configuration in Vite and Netlify

## Deployment Steps

1. **Build locally to verify**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - The `netlify.toml` will handle build configuration
   - SPA redirects will work automatically

3. **Configure Cloudflare**:
   - Ensure proxy is enabled (orange cloud)
   - Set cache level to "Standard" or lower
   - Consider disabling "Auto Minify" if issues persist

4. **Test deployment**:
   - Check direct navigation to routes
   - Verify page refresh works
   - Test all navigation links

## Debugging Production Issues

If blank page persists, open browser console and run:
```javascript
window.debugInfo()
```

This will show detailed information about:
- Environment settings
- Loaded scripts and stylesheets
- Current URL and routing state
- Any JavaScript errors

## Cloudflare-Specific Settings

### Recommended Cloudflare Settings:
- **SSL**: Full (strict)
- **Caching Level**: Standard
- **Browser Cache TTL**: 4 hours
- **Auto Minify**: Disabled for HTML/CSS/JS
- **Rocket Loader**: Disabled

### Page Rules to Consider:
```
custodius.us/*
- Cache Level: Bypass
- Browser Cache TTL: 30 minutes
```

## Files Modified/Added:

- ✅ `netlify.toml` (NEW) - Netlify configuration
- ✅ `vite.config.ts` (UPDATED) - Build optimization
- ✅ `src/debug.ts` (NEW) - Debug utilities
- ✅ `src/main.tsx` (UPDATED) - Added error handling
- ✅ `DEPLOYMENT_CHECKLIST.md` (NEW) - This file

## Troubleshooting Quick Fixes:

1. **Still seeing blank page?**
   - Clear Cloudflare cache
   - Hard refresh browser (Ctrl+Shift+R)
   - Check browser console for errors

2. **Routes not working?**
   - Verify `_redirects` file in build output
   - Check Netlify function logs

3. **Assets not loading?**
   - Verify Cloudflare isn't blocking requests
   - Check CORS settings if using external APIs