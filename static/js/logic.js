// Function to change legend visibility
function changeMapLegend() {
    const legendElement = document.getElementById('map-legend');
    if (legendElement.style.display === 'block' || legendElement.style.display === '') {
        legendElement.style.display = 'none';
    } else {
        legendElement.style.display = 'block';
    }
}

// Create the map and add a default basemap layer (Street Map)
const mapInstance = L.map('map', {
    center: [37.7749, -122.4194],
    zoom: 4,
});

// Create different basemap layers
const streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapInstance);

const satelliteMapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const topographicMapLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri'
});

// Create a layer for earthquakes
const earthquakeDataUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
const earthquakeLayer = L.layerGroup().addTo(mapInstance);



// Function to determine color based on depth
function getColorByDepth(depth) {
    const depthColors = {
        '10 - 30 km': 'limegreen',
        '30 - 50 km': 'greenyellow',
        '50 - 70 km': 'peru',
        '70 - 90 km': 'indianred',
        '90+ km': 'orangered',
    };
    return depthColors[depth];
}

// Create a custom legend and add it to the map
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    const depthRanges = ['10 - 30 km', '30 - 50 km', '50 - 70 km', '70 - 90 km', '90+ km'];
    const depthColors = ['limegreen', 'greenyellow', 'peru', 'indianred', 'orangered'];

    // Add legend title
    div.innerHTML += '<h4>Profundidad (km)</h4>';

    // Add colors and depth range labels as div backgrounds
    for (let i = 0; i < depthRanges.length; i++) {
        div.innerHTML +=
            '<div class="legend-item">' +
            '<div class="legend-color-square" style="background:' + depthColors[i] + '"></div>' +
            depthRanges[i] + (depthRanges[i + 1] ? '<br>' : '+') +
            '</div>';
    }

    return div;
};

legend.addTo(mapInstance); // Add the legend to the map



// Get earthquake data and create markers
fetch(earthquakeDataUrl)
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const { geometry, properties } = feature;
            const { mag } = properties;
            const lat = geometry.coordinates[1];
            const lon = geometry.coordinates[0];
            const depth = geometry.coordinates[2];
            const depthRange = depth <= 10 ? '10 - 30 km' :
                              depth <= 30 ? '30 - 50 km' :
                              depth <= 50 ? '50 - 70 km' :
                              depth <= 70 ? '70 - 90 km' : '90+ km';

            const markerOptions = {
                radius: mag * 3,
                fillColor: getColorByDepth(depthRange),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.7,
            };

            // Create popup content with exact location
            const popupContent = `Magnitud: ${mag}<br>Profundidad: ${depth} km<br>Ubicación: Lat ${lat.toFixed(4)}, Lon ${lon.toFixed(4)}`;

            const marker = L.circleMarker([lat, lon], markerOptions)
                .bindPopup(popupContent)
                .addTo(earthquakeLayer);
        });
    });

// Create a layer for tectonic plates
const tectonicPlatesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
const tectonicPlatesLayer = L.layerGroup();

// Load GeoJSON data from tectonic plates
fetch(tectonicPlatesUrl)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'peru',
                weight: 2,
            },
        }).addTo(tectonicPlatesLayer);
    });

// Add basemap layers and overlays to the layer control
const mapBaseLayers = {
    'Mapa de Calles': streetMapLayer,
    'Mapa Satelital': satelliteMapLayer,
    'Mapa Topografico': topographicMapLayer,
};

const mapOverlayLayers = {
    'Terremotos': earthquakeLayer,
    'Placas Tectónicas': tectonicPlatesLayer,
};

// Set default layers (Street Map, Earthquakes, Tectonic Plates)
mapInstance.addLayer(streetMapLayer);
earthquakeLayer.addTo(mapInstance);
tectonicPlatesLayer.addTo(mapInstance);

// Create layer control with default layers
L.control.layers(mapBaseLayers, mapOverlayLayers, { collapsed: false }).addTo(mapInstance);

// Function to create and update legend using D3.js
function updateMapLegend() {
    const legendElement = d3.select('#map-legend');

    const depthRanges = ['10 - 30 km', '30 - 50 km', '50 - 70 km', '70 - 90 km', '90+ km'];
    const depthColors = ['greenyellow', 'peru', 'indianred', 'orangered', 'red'];

    // Delete any existing legend content
    legendElement.selectAll('*').remove();

    // Create a title for the legend
    legendElement.append('h4').text('Leyenda de Profundidad');

    // Create legend items
    const legendItems = legendElement.selectAll('div')
        .data(depthRanges)
        .enter()
        .append('div')
        .attr('class', 'legend-item');

    // Create color squares
    legendItems.append('div')
        .style('background-color', (d, i) => depthColors[i])
        .attr('class', 'legend-color-square');

    // Add depth range labels with values
    legendItems.append('div')
        .html((d, i) => `<strong>${d}:</strong>`)
        .attr('class', 'legend-label');
    


    // Add additional earthquake information to the legend
    legendItems.append('div')
        .html((d) => {

            const earthquakes = earthquakeLayer.getLayers();
            const earthquakeInfo = earthquakes
                .filter((earthquake) => earthquake.feature.properties.depthRange === d)
                .map((earthquake) => {
                    const properties = earthquake.feature.properties;
                    return `
                        <strong>Magnitude:</strong> ${properties.mag}<br>
                        <strong>Location:</strong> ${properties.location}<br>
                        <strong>Depth:</strong> ${properties.depth} km<br>
                    `;
                })
                .join('<br>');
            return earthquakeInfo;
        })
        .attr('class', 'legend-earthquake-info');
}