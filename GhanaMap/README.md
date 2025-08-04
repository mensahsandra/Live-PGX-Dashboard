# PowerGridX - Ghana Smart Grid Management System

A comprehensive web-based platform for monitoring and managing Ghana's power grid infrastructure with interactive maps, real-time monitoring, and smart grid management capabilities.

## 🌟 Features

### 🗺️ Interactive Ghana Map
- **Real-time Region Hover**: Enhanced tooltips showing region statistics
- **District Categorization**: Urban, Peri-Urban, and Rural classifications
- **Interactive Navigation**: Click regions to explore districts and transformers
- **Visual Feedback**: Smooth animations and hover effects

### ⚡ Transformer Management
- **Interactive Cards**: Detailed transformer information with district categorization
- **Smart Monitoring**: Real-time meter and monitoring node data
- **Status Tracking**: Active, Maintenance, and Fault status indicators
- **Comprehensive Data**: Capacity, load, efficiency, and location information

### 📊 Smart Grid Analytics
- **Region Statistics**: Districts, transformers, smart meters, and operational status
- **Performance Metrics**: Load analysis, efficiency tracking, and health monitoring
- **Predictive Maintenance**: Maintenance scheduling and alert systems

### 🏗️ Multi-View Platform
- **Infrastructure Map**: Interactive Ghana map with region exploration
- **Live Simulation**: Real-time grid monitoring and simulation
- **Admin Panel**: System administration and configuration
- **Transformers View**: Comprehensive transformer management interface

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ghanamap.git
   cd ghanamap
   ```

2. **Start the local server**
   ```bash
   python -m http.server 8000
   ```

3. **Open your browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
ghanamap/
├── integrated-index.html      # Main application file
├── index.html                 # Basic map interface
├── script.js                  # JavaScript functionality
├── style.css                  # Styling and layout
├── ashanti_dummy_data.json    # Sample region data
├── favicon/                   # Application icons
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Maps**: amCharts 5 with Ghana geodata
- **UI Framework**: Custom CSS with modern design patterns
- **Icons**: Flaticon UI icons
- **Data**: JSON-based data structure

## 🎯 Key Components

### Region Statistics
- **Location**: `getRegionStats()` function (lines ~2300-2400)
- **Purpose**: Tooltip information for map hover
- **Data**: Districts, transformers, smart meters, operational status

### Comprehensive Region Data
- **Location**: `generateRegionData()` function (lines ~2980-2990)
- **Purpose**: Detailed region information for sidebar
- **Data**: Efficiency, load, capacity, health metrics

### Transformer Management
- **Location**: `comprehensiveTransformerData` object (lines ~2500-2700)
- **Purpose**: Complete transformer information with categorization
- **Features**: Urban/Peri-Urban/Rural classification, metering data

## 🏙️ District Categorization

### Urban Areas
- High-density regions with extensive infrastructure
- Examples: Accra Metropolitan, Kumasi Metropolitan
- Features: High transformer density, advanced monitoring

### Peri-Urban Areas
- Transitional zones between urban and rural
- Examples: Ga East Municipal
- Features: Moderate infrastructure, growing demand

### Rural Areas
- Low-density regions with basic infrastructure
- Examples: Obuasi Municipal
- Features: Essential services, development focus

## 📈 Monitoring Features

### Real-time Data
- **Load Monitoring**: Current load percentages and capacity utilization
- **Efficiency Tracking**: Operational efficiency metrics
- **Status Monitoring**: Active, maintenance, and fault status
- **Smart Metering**: Advanced metering infrastructure data

### Interactive Elements
- **Hover Effects**: Enhanced visual feedback on map regions
- **Click Navigation**: Hierarchical exploration (Region → District → Transformer)
- **Dynamic Updates**: Real-time statistics and status updates
- **Responsive Design**: Mobile-friendly interface

## 🔧 Development

### Adding New Regions
1. Update `comprehensiveTransformerData` object
2. Add region statistics to `getRegionStats()` function
3. Include district categorization (Urban/Peri-Urban/Rural)
4. Add transformer data with monitoring information

### Customizing Styles
- Modify `style.css` for visual changes
- Update color schemes in CSS variables
- Adjust responsive breakpoints as needed

### Extending Functionality
- Add new views in the main navigation
- Implement additional monitoring features
- Integrate with external data sources

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🎉 Acknowledgments

- amCharts for the interactive mapping library
- Ghana geodata providers
- PowerGridX development team
- Open source community contributors

---

**PowerGridX** - Smart Infrastructure for Africa's Power Grid ⚡ 