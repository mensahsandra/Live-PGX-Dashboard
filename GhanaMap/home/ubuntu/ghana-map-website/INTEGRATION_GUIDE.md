# PowerGridX Integration Guide

This guide explains how to run the integrated PowerGridX platform that combines:
1. **Ghana Infrastructure Map** (Static HTML/JS)
2. **PowerGridX Dashboard** (React Application)
3. **Unified Navigation** (Seamless switching between views)

## Quick Start

### Option 1: Simple Integration (Recommended)
1. **Open the integrated platform:**
   ```bash
   # Open integrated-index.html in your browser
   open integrated-index.html
   ```

2. **Start your React app** (in a separate terminal):
   ```bash
   cd powergridx-enhanced
   npm run dev
   # or
   pnpm dev
   ```

3. **Access the platform:**
   - The integrated platform will be available at the HTML file location
   - Ghana Map works immediately
   - Dashboard loads from http://localhost:5173 when you click the tab

### Option 2: Full Development Setup

1. **Set up the React app:**
   ```bash
   cd powergridx-enhanced
   pnpm install
   pnpm dev
   ```

2. **Serve the map files** (optional, for development):
   ```bash
   # In the ghana-map-website directory
   python -m http.server 8000
   # or
   npx serve .
   ```

## Features

### 🗺️ Ghana Infrastructure Map
- **Interactive map** of Ghana with regions, districts, zones
- **Hierarchical navigation** through infrastructure
- **Transformer details** with technical specifications
- **Area classifications** (Urban, Peri-urban, Rural)
- **Real-time data simulation**

### 📊 PowerGridX Dashboard
- **Live energy tracking** (2,847.6 kWh monitored)
- **Theft detection** (12.3% detected)
- **Smart pole management** (47 connected)
- **Comprehensive analytics** and reporting
- **Modern React UI** with charts and visualizations

### 🔄 Unified Navigation
- **Seamless switching** between map and dashboard
- **Loading states** and status indicators
- **Keyboard shortcuts** (Ctrl+1, Ctrl+2, Ctrl+3)
- **External dashboard** link integration
- **Responsive design** for all screen sizes

## Navigation

| Button | View | Shortcut | Description |
|--------|------|----------|-------------|
| 🗺️ Ghana Infrastructure Map | Map View | Ctrl+1 | Interactive Ghana power grid map |
| 📊 Live PGX Dashboard | Dashboard | Ctrl+2 | React-based analytics dashboard |
| 🌐 PowerGridX Website | Website | Ctrl+3 | Full company website |
| 📈 External Dashboard | External | - | Opens live dashboard in new tab |

## Customization

### Update React App URL
In `integrated-index.html`, update the iframe source:
```javascript
// Development
iframe.src = 'http://localhost:5173';

// Production
iframe.src = 'https://your-deployed-app.com';
```

### Add New Views
1. Add navigation button in header
2. Create new view container
3. Add switch case in `showView()` function
4. Implement loading logic if needed

### Styling
- Main styles in `style.css`
- Integration styles in `integrated-index.html`
- React app styles in `powergridx-enhanced/src/`

## Deployment

### Static Hosting (Map + Integration)
```bash
# Build React app
cd powergridx-enhanced
pnpm build

# Deploy both:
# - integrated-index.html + assets (map)
# - dist/ folder (React app)
```

### Separate Deployment
1. **Deploy React app** to Vercel/Netlify
2. **Deploy map files** to any static host
3. **Update iframe URLs** in integration file

## Troubleshooting

### React App Not Loading
- Check if `pnpm dev` is running
- Verify URL in iframe src
- Check browser console for CORS errors

### Map Not Displaying
- Ensure amCharts scripts are loading
- Check console for JavaScript errors
- Verify Ghana geodata is accessible

### Navigation Issues
- Clear browser cache
- Check for JavaScript errors
- Ensure all view containers exist

## Development Tips

1. **Use browser dev tools** to debug iframe communication
2. **Test on different screen sizes** for responsiveness
3. **Monitor console logs** for integration issues
4. **Use keyboard shortcuts** for quick navigation testing

## Next Steps

1. **Add data synchronization** between map and dashboard
2. **Implement user authentication** across both systems
3. **Add real-time updates** via WebSocket connections
4. **Create mobile-optimized views**
5. **Add offline functionality** for rural areas

## Support

For integration issues:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Ensure correct URLs in iframe sources
4. Test individual components separately

---

**PowerGridX - Smart Infrastructure for Africa's Power** 🚀