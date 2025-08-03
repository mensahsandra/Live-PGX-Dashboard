// Ghana Map with Dummy Data
const ghanaData = {
  "GH-AA": {
    name: "Greater Accra",
    districts: [
      {
        name: "Accra Metropolitan",
        status: "active",
        zones: [
          {
            name: "Osu Zone",
            places: [
              {
                name: "Osu Castle Area",
                type: "urban",
                transformers: [
                  {
                    id: "TR-ACC-001",
                    name: "Osu Primary Transformer",
                    type: "Distribution",
                    capacity: "500 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "5.5558° N, 0.1826° W",
                    installDate: "2019-03-15",
                    lastMaintenance: "2024-01-20",
                    devices: { meters: 45, monitoringNodes: 12 }
                  }
                ]
              },
              {
                name: "Labadi Beach Area",
                type: "peri-urban",
                transformers: [
                  {
                    id: "TR-ACC-002",
                    name: "Labadi Distribution Transformer",
                    type: "Distribution",
                    capacity: "300 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "5.5558° N, 0.1626° W",
                    installDate: "2020-08-10",
                    lastMaintenance: "2024-01-15",
                    devices: { meters: 28, monitoringNodes: 8 }
                  }
                ]
              }
            ]
          },
          {
            name: "Adabraka Zone",
            places: [
              {
                name: "Adabraka Market Area",
                type: "urban",
                transformers: [
                  {
                    id: "TR-ACC-003",
                    name: "Adabraka Commercial Transformer",
                    type: "Distribution",
                    capacity: "750 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "5.5731° N, 0.2058° W",
                    installDate: "2020-07-10",
                    lastMaintenance: "2024-02-15",
                    devices: { meters: 62, monitoringNodes: 15 }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "GH-AH": {
    name: "Ashanti",
    districts: [
      {
        name: "Kumasi Metropolitan",
        status: "active",
        zones: [
          {
            name: "Kumasi Central Zone",
            places: [
              {
                name: "Kejetia Market Area",
                type: "urban",
                transformers: [
                  {
                    id: "TR-KMA-001",
                    name: "Kejetia Market Transformer",
                    type: "Distribution",
                    capacity: "1000 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "6.6885° N, 1.6244° W",
                    installDate: "2021-05-18",
                    lastMaintenance: "2024-02-28",
                    devices: { meters: 78, monitoringNodes: 18 }
                  }
                ]
              },
              {
                name: "Bantama Residential",
                type: "peri-urban",
                transformers: [
                  {
                    id: "TR-KMA-002",
                    name: "Bantama Residential Transformer",
                    type: "Distribution",
                    capacity: "400 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "6.7085° N, 1.6344° W",
                    installDate: "2019-11-22",
                    lastMaintenance: "2024-01-20",
                    devices: { meters: 35, monitoringNodes: 10 }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "GH-WP": {
    name: "Western",
    districts: [
      {
        name: "Sekondi-Takoradi Metropolitan",
        status: "in-progress",
        zones: [
          {
            name: "Takoradi Industrial Zone",
            places: [
              {
                name: "Takoradi Port Area",
                type: "urban",
                transformers: [
                  {
                    id: "TR-STM-001",
                    name: "Takoradi Port Transformer",
                    type: "Power",
                    capacity: "2000 kVA",
                    voltage: "161/33 kV",
                    status: "in-progress",
                    location: "4.8845° N, 1.7554° W",
                    installDate: "2023-09-12",
                    lastMaintenance: "2024-03-05",
                    devices: { meters: 95, monitoringNodes: 25 }
                  }
                ]
              },
              {
                name: "Effia-Kuma Village",
                type: "rural",
                transformers: [
                  {
                    id: "TR-STM-002",
                    name: "Effia-Kuma Rural Transformer",
                    type: "Distribution",
                    capacity: "200 kVA",
                    voltage: "33/11 kV",
                    status: "active",
                    location: "4.8945° N, 1.7654° W",
                    installDate: "2022-03-15",
                    lastMaintenance: "2024-02-10",
                    devices: { meters: 18, monitoringNodes: 5 }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded, initializing...');
  showNoSelection();
  
  setTimeout(() => {
    showTestInterface();
  }, 500);
  
  if (typeof am5 !== 'undefined') {
    console.log('amCharts available, initializing map...');
    initializeMap();
  } else {
    console.log('amCharts not available, using test interface only');
  }
});

function initializeMap() {
  try {
    am5.ready(function() {
      console.log('amCharts ready, creating map...');
      
      var root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);
      
      var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoMercator()
      }));
      
      var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_ghanaLow
      }));
      
      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        fill: am5.color("#4CAF50")
      });
      
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color("#66BB6A")
      });
      
      polygonSeries.mapPolygons.template.on("click", function(ev) {
        var dataItem = ev.target.dataItem;
        var regionId = dataItem.get("id");
        var regionName = dataItem.get("name");
        
        console.log("Clicked region:", regionName, "ID:", regionId);
        
        var foundRegionId = findRegionId(regionId, regionName);
        
        if (foundRegionId) {
          showRegionDistricts(foundRegionId);
        } else {
          showAvailableRegions();
        }
      });
      
      console.log('Map initialized successfully');
      showTestInterface();
    });
  } catch (error) {
    console.error('Error initializing map:', error);
    showTestInterface();
  }
}

function findRegionId(id, name) {
  if (ghanaData[id]) return id;
  
  const nameMap = {
    "Greater Accra": "GH-AA",
    "Ashanti": "GH-AH", 
    "Western": "GH-WP",
    "Eastern": "GH-EP",
    "Northern": "GH-NP",
    "Volta": "GH-TV",
    "Central": "GH-CP",
    "Upper East": "GH-UE",
    "Upper West": "GH-UW",
    "Brong Ahafo": "GH-BA"
  };
  
  return nameMap[name] || null;
}

function showTestInterface() {
  const chartDiv = document.getElementById('chartdiv');
  if (chartDiv && !chartDiv.querySelector('.test-interface')) {
    const testDiv = document.createElement('div');
    testDiv.className = 'test-interface';
    testDiv.style.cssText = `
      position: absolute; top: 20px; left: 20px; z-index: 1000;
      background: rgba(0,0,0,0.8); padding: 15px; border-radius: 5px;
    `;
    testDiv.innerHTML = `
      <h4 style="color: #4CAF50; margin: 0 0 10px 0;">Test Regions</h4>
      <button onclick="showRegionDistricts('GH-AA')" style="margin: 5px; padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">Greater Accra</button>
      <button onclick="showRegionDistricts('GH-AH')" style="margin: 5px; padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">Ashanti</button>
      <button onclick="showRegionDistricts('GH-WP')" style="margin: 5px; padding: 8px 12px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer;">Western</button>
    `;
    chartDiv.appendChild(testDiv);
  }
}

function showNoSelection() {
  console.log('Showing no selection state');
  const sidebar = document.getElementById('district-info');
  if (sidebar) {
    sidebar.innerHTML = `
      <div class="no-selection">
        <p>Click on a region to view districts and infrastructure details</p>
        <p style="color: #888; font-size: 11px; margin-top: 20px;">
          Test the functionality with the buttons below:
        </p>
        <div style="margin-top: 20px;">
          <button onclick="showRegionDistricts('GH-AA')" style="margin: 5px; padding: 10px 15px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer; display: block; width: 200px;">Test Greater Accra</button>
          <button onclick="showRegionDistricts('GH-AH')" style="margin: 5px; padding: 10px 15px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer; display: block; width: 200px;">Test Ashanti</button>
          <button onclick="showRegionDistricts('GH-WP')" style="margin: 5px; padding: 10px 15px; background: #4CAF50; color: white; border: none; border-radius: 3px; cursor: pointer; display: block; width: 200px;">Test Western</button>
        </div>
      </div>
    `;
    console.log('Sidebar content updated with test buttons');
  } else {
    console.error('Sidebar element not found!');
  }
}

function showAvailableRegions() {
  const sidebar = document.getElementById('district-info');
  if (!sidebar) return;
  
  let html = `<h3>Available Regions</h3><p>Click any region below:</p>`;
  
  Object.keys(ghanaData).forEach(regionId => {
    const region = ghanaData[regionId];
    html += `
      <div class="district-item clickable" onclick="showRegionDistricts('${regionId}')">
        <div>
          <div class="district-name">${region.name}</div>
          <div style="font-size: 11px; color: #888;">Districts: ${region.districts.length}</div>
        </div>
        <span class="status-badge status-available">Available</span>
      </div>
    `;
  });
  
  sidebar.innerHTML = html;
}

function showRegionDistricts(regionId) {
  console.log('Showing districts for region:', regionId);
  const region = ghanaData[regionId];
  const sidebar = document.getElementById('district-info');
  
  if (!region || !sidebar) {
    console.error('Region not found or sidebar missing:', regionId);
    return;
  }
  
  let html = `
    <div class="breadcrumb">
      <span class="breadcrumb-link" onclick="showNoSelection()">Regions</span> > 
      <span class="breadcrumb-current">${region.name}</span>
    </div>
    <h3>${region.name} Region</h3>
    <p>Districts: ${region.districts.length}</p>
  `;

  if (region.districts.length > 0) {
    const mainDistrict = region.districts[0];
    html += `
      <div class="district-item clickable" onclick="showDistrictZones('${regionId}', 0)">
        <div>
          <div class="district-name">${mainDistrict.name}</div>
        </div>
      </div>
    `;
  }

  if (region.districts.length > 1) {
    html += `
      <h4 style="margin-top: 25px; margin-bottom: 15px; color: #888; font-size: 14px;">Other Districts</h4>
    `;
    
    const otherDistrictsMap = {
      "GH-AA": [
        "Ga East Municipal", "Ga West Municipal", "Ga South Municipal", 
        "Ga Central Municipal", "Ledzokuku Municipal", "Krowor Municipal",
        "Adentan Municipal", "Ashaiman Municipal", "La Nkwantanang Madina Municipal"
      ],
      "GH-AH": [
        "Obuasi Municipal", "Ejisu Municipal", "Kwabre East Municipal",
        "Afigya Kwabre South", "Atwima Nwabiagya Municipal", "Bosomtwe",
        "Atwima Kwanwoma", "Ejura Sekyedumase Municipal", "Mampong Municipal"
      ],
      "GH-WP": [
        "Shama", "Ahanta West", "Nzema East Municipal", "Ellembelle",
        "Wassa East", "Wassa Amenfi West Municipal", "Prestea Huni Valley Municipal",
        "Tarkwa Nsuaem Municipal", "Wassa Amenfi Central Municipal"
      ]
    };
    
    const otherDistricts = otherDistrictsMap[regionId] || [];
    
    otherDistricts.forEach((districtName, index) => {
      html += `
        <div class="district-item" style="opacity: 0.6; cursor: not-allowed;">
          <div>
            <div class="district-name">${districtName}</div>
            <div style="font-size: 11px; color: #666;">Coming Soon</div>
          </div>
        </div>
      `;
    });
  }

  sidebar.innerHTML = html;
}

function showDistrictZones(regionId, districtIndex) {
  const region = ghanaData[regionId];
  const district = region.districts[districtIndex];
  const sidebar = document.getElementById('district-info');
  
  let html = `
    <div class="breadcrumb">
      <span class="breadcrumb-link" onclick="showNoSelection()">Regions</span> > 
      <span class="breadcrumb-link" onclick="showRegionDistricts('${regionId}')">${region.name}</span> > 
      <span class="breadcrumb-current">${district.name}</span>
    </div>
    <h3>${district.name}</h3>
    <p>Zones: ${district.zones.length}</p>
  `;
  
  district.zones.forEach((zone, index) => {
    html += `
      <div class="zone-item clickable" onclick="showZonePlaces('${regionId}', ${districtIndex}, ${index})">
        <div>
          <div class="zone-name">${zone.name}</div>
          <div style="font-size: 11px; color: #888;">Places: ${zone.places.length}</div>
        </div>
      </div>
    `;
  });
  
  sidebar.innerHTML = html;
}

function showZonePlaces(regionId, districtIndex, zoneIndex) {
  const region = ghanaData[regionId];
  const district = region.districts[districtIndex];
  const zone = district.zones[zoneIndex];
  const sidebar = document.getElementById('district-info');
  
  let html = `
    <div class="breadcrumb">
      <span class="breadcrumb-link" onclick="showNoSelection()">Regions</span> > 
      <span class="breadcrumb-link" onclick="showRegionDistricts('${regionId}')">${region.name}</span> > 
      <span class="breadcrumb-link" onclick="showDistrictZones('${regionId}', ${districtIndex})">${district.name}</span> > 
      <span class="breadcrumb-current">${zone.name}</span>
    </div>
    <h3>${zone.name}</h3>
    <p>Places: ${zone.places.length}</p>
  `;
  
  zone.places.forEach((place, index) => {
    const typeColors = {
      'urban': '#4CAF50',
      'peri-urban': '#FF9800', 
      'rural': '#2196F3'
    };
    
    const typeColor = typeColors[place.type] || '#888';
    
    html += `
      <div class="place-item clickable" onclick="showPlaceTransformers('${regionId}', ${districtIndex}, ${zoneIndex}, ${index})">
        <div>
          <div class="place-name">${place.name}</div>
          <div style="font-size: 11px; color: ${typeColor}; font-weight: bold; text-transform: uppercase;">${place.type}</div>
          <div style="font-size: 11px; color: #888;">Transformers: ${place.transformers.length}</div>
        </div>
      </div>
    `;
  });
  
  sidebar.innerHTML = html;
}

function showPlaceTransformers(regionId, districtIndex, zoneIndex, placeIndex) {
  const region = ghanaData[regionId];
  const district = region.districts[districtIndex];
  const zone = district.zones[zoneIndex];
  const place = zone.places[placeIndex];
  const sidebar = document.getElementById('district-info');
  
  const typeColors = {
    'urban': '#4CAF50',
    'peri-urban': '#FF9800', 
    'rural': '#2196F3'
  };
  
  const typeColor = typeColors[place.type] || '#888';
  
  let html = `
    <div class="breadcrumb">
      <span class="breadcrumb-link" onclick="showNoSelection()">Regions</span> > 
      <span class="breadcrumb-link" onclick="showRegionDistricts('${regionId}')">${region.name}</span> > 
      <span class="breadcrumb-link" onclick="showDistrictZones('${regionId}', ${districtIndex})">${district.name}</span> > 
      <span class="breadcrumb-link" onclick="showZonePlaces('${regionId}', ${districtIndex}, ${zoneIndex})">${zone.name}</span> > 
      <span class="breadcrumb-current">${place.name}</span>
    </div>
    <h3>${place.name}</h3>
    <div style="color: ${typeColor}; font-weight: bold; text-transform: uppercase; margin-bottom: 10px;">${place.type} Area</div>
    <p>Transformers: ${place.transformers.length}</p>
  `;
  
  place.transformers.forEach((transformer, index) => {
    const statusClass = `status-${transformer.status}`;
    
    html += `
      <div class="transformer-item clickable" onclick="showTransformerDetails('${regionId}', ${districtIndex}, ${zoneIndex}, ${placeIndex}, ${index})">
        <div class="transformer-header">
          <div class="transformer-icon"><div class="transformer-icon-custom"></div></div>
          <div class="transformer-info">
            <div class="transformer-name">${transformer.name}</div>
            <div class="transformer-id">${transformer.id}</div>
          </div>
          <span class="status-badge ${statusClass}">${transformer.status}</span>
        </div>
        <div class="transformer-details">
          <div class="detail-row">
            <span class="detail-label">Type:</span>
            <span class="detail-value">${transformer.type}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Capacity:</span>
            <span class="detail-value">${transformer.capacity}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Voltage:</span>
            <span class="detail-value">${transformer.voltage}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  sidebar.innerHTML = html;
}

function showTransformerDetails(regionId, districtIndex, zoneIndex, placeIndex, transformerIndex) {
  const region = ghanaData[regionId];
  const district = region.districts[districtIndex];
  const zone = district.zones[zoneIndex];
  const place = zone.places[placeIndex];
  const transformer = place.transformers[transformerIndex];
  const sidebar = document.getElementById('district-info');
  
  const statusClass = `status-${transformer.status}`;
  
  const typeColors = {
    'urban': '#4CAF50',
    'peri-urban': '#FF9800', 
    'rural': '#2196F3'
  };
  
  const typeColor = typeColors[place.type] || '#888';
  
  let html = `
    <div class="breadcrumb">
      <span class="breadcrumb-link" onclick="showNoSelection()">Regions</span> > 
      <span class="breadcrumb-link" onclick="showRegionDistricts('${regionId}')">${region.name}</span> > 
      <span class="breadcrumb-link" onclick="showDistrictZones('${regionId}', ${districtIndex})">${district.name}</span> > 
      <span class="breadcrumb-link" onclick="showZonePlaces('${regionId}', ${districtIndex}, ${zoneIndex})">${zone.name}</span> > 
      <span class="breadcrumb-link" onclick="showPlaceTransformers('${regionId}', ${districtIndex}, ${zoneIndex}, ${placeIndex})">${place.name}</span> > 
      <span class="breadcrumb-current">${transformer.name}</span>
    </div>
    
    <div class="transformer-detail-view">
      <div class="transformer-icon-large" style="font-size: 48px;"><div class="transformer-icon-custom large"></div></div>
      <h3>${transformer.name}</h3>
      <div class="transformer-id">${transformer.id}</div>
      <div style="color: ${typeColor}; font-weight: bold; text-transform: uppercase; margin: 10px 0;">${place.type} Location</div>
      <span class="status-badge ${statusClass}">${transformer.status}</span>
      
      <div class="detail-section">
        <h4>Technical Specifications</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Type:</span>
            <span class="detail-value">${transformer.type}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Capacity:</span>
            <span class="detail-value">${transformer.capacity}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Voltage:</span>
            <span class="detail-value">${transformer.voltage}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">${transformer.location}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>Maintenance Information</h4>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Install Date:</span>
            <span class="detail-value">${transformer.installDate}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Maintenance:</span>
            <span class="detail-value">${transformer.lastMaintenance}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>Connected Devices</h4>
        <div class="device-grid">
          <div class="device-item" style="cursor: pointer;" onclick="linkToTransformerFromMap('${transformer.id}')">
            <div class="device-icon"><i class="fi fi-rr-chart-histogram" style="font-size: 24px; color: #4CAF50;"></i></div>
            <div class="device-info">
              <div class="device-name">Smart Meters</div>
              <div class="device-count">${transformer.devices.meters}</div>
            </div>
          </div>
          <div class="device-item">
            <div class="device-icon"><i class="fi fi-rr-signal-alt" style="font-size: 24px; color: #2196F3;"></i></div>
            <div class="device-info">
              <div class="device-name">Monitoring Nodes</div>
              <div class="device-count">${transformer.devices.monitoringNodes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  sidebar.innerHTML = html;
}/
/ Navigation Functions
function showMapView() {
  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.nav-btn[onclick="showMapView()"]').classList.add('active');
  
  // Show map content (already visible)
  console.log('Map view activated');
}

function showLiveSimulation() {
  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.nav-btn[onclick="showLiveSimulation()"]').classList.add('active');
  
  // This will be implemented when you share the live simulation files
  alert('Live Simulation will be integrated here. Please share the PowerGridX simulation files.');
  console.log('Live simulation requested');
}

function showAdmin() {
  // Update active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.nav-btn[onclick="showAdmin()"]').classList.add('active');
  
  // This will be implemented when you share the admin files
  alert('Admin panel will be integrated here. Please share the PowerGridX admin files.');
  console.log('Admin panel requested');
}