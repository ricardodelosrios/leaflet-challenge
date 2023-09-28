# leaflet-challenge

## Introduction


The United States Geological Survey, commonly known as USGS, plays a pivotal role in our understanding of the Earth's dynamics and environmental changes. This esteemed organization has a multifaceted mission, which includes providing invaluable scientific insights into natural hazards, monitoring the health of ecosystems and the environment, and assessing the profound impacts of climate change and land-use alterations. To accomplish these vital objectives, USGS scientists are constantly at the forefront of innovation, pioneering new methodologies and tools to furnish timely, pertinent, and actionable information about our planet and its intricate processes.

In this project, a code will be made that allows users to explore data related to earthquakes and plate tectonics on an interactive map and provides a legend to better understand the information displayed.

## How does the project work?

The project has 3 files `index.html`, `logic.js` and `style.css`, below I will make a description of each of them:

   * [index.html](https://github.com/ricardodelosrios/leaflet-challenge/blob/main/index.html). This code is an HTML web page that incorporates some external libraries (**Leaflet and D3**) and custom style files and scripts to create an interactive map.

This code is a basic structure of a web page. Start by stating that this is an HTML5 document (the most recent version of HTML). Then, in the <head> section, metadata such as the character set used, the browser window settings, and the page title are defined. Additionally, links to external CSS style sheets are included to style the web page. These styles will be loaded from the web to make sure the page looks and functions properly.

In the <body> section, the visible content of the page is placed, which in this case includes a container (<div>) with the id "map". Inside this <div> tag, an interactive map will likely be created later using JavaScript and the Leaflet and D3 libraries. Finally, custom JavaScript files are also linked that will be used to add specific functionality to the page. In short, this code establishes the basic structure of a web page and imports external resources and custom files to create an interactive experience, possibly a dynamic map.

   * [style.css](https://github.com/ricardodelosrios/leaflet-challenge/blob/main/static/css/style.css):This code is a set of instructions for styling a web page. In the first part, it is established that there should be no additional space around the visible content on the page, thus eliminating default margins and padding. Next, you define what an element with the id "map" will look like, which is probably a map on the web page. This map will extend across the entire width of the available space and will have a height of 920 pixels, and will also be permanently positioned on the page.

The second part of the code is responsible for designing a legend box that will be added to the map. The legend will be located in the lower right corner of the page and will have a semi-transparent background, rounded edges, and subtle shading. It also contains text elements such as colors and labels. In short, this code is used to control how certain elements are viewed and positioned on a web page, such as the map and its legend.

   * [logic.js](https://github.com/ricardodelosrios/leaflet-challenge/blob/main/static/js/logic.js):This code represents a series of instructions written in programming language to create an interactive web application related to earthquakes and plate tectonics.

In summary, the main actions performed by this code are:

1. Defines a function called changeMapLegend() that controls the visibility of the legend on the map, alternating between hiding it and showing it when a button or element is clicked.

2. Create an interactive map using the Leaflet library, with a set of base layers (street, satellite, topographic maps) and overlay layers (earthquakes and plate tectonics).

3. Uses the D3.js library to create and update a map legend that displays information about the depth of earthquakes and their associated colors.

4. Loads earthquake and plate tectonic data from external sources and displays it on the map, with markers of different sizes and colors depending on the magnitude and depth of the earthquakes.

5. Implements a layer control that allows the user to select which overlay layers to display on the map, such as earthquakes and plate tectonics.




     
