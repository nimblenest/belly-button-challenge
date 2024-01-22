// Replace 'yourURL' with the actual URL
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Use D3 to fetch the JSON data
d3.json(url).then(function(data) {
  // Work with the loaded data here
  console.log(data);
}).catch(function(error) {
  // Handle errors
  console.error('Error loading JSON data:', error);
});
  // Initial chart rendering
  buildChart(data.names[0]);

// Function to build the chart based on the selected sample
function buildChart(selectedSample) {
  d3.json(url).then(function(data) {
    // Filter data for the selected sample
    var selectedData = data.samples.find(sample => sample.id === selectedSample);

    // Get top 10 OTUs
    var topOTUs = selectedData.otu_ids.slice(0, 10).reverse();
    var topValues = selectedData.sample_values.slice(0, 10).reverse();
    var topLabels = selectedData.otu_labels.slice(0, 10).reverse();

    // Create horizontal bar chart
    var trace = {
      type: "bar",
      orientation: "h",
      x: topValues,
      y: topOTUs.map(otu => `OTU ${otu}`),
      text: topLabels
    };

    var layout = {
      title: `Top 10 OTUs for ${selectedSample}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("barChart", [trace], layout);
  });
}

// Event listener for dropdown change
d3.select("#selDataset").on("change", function() {
  var selectedSample = d3.select(this).property("value");
  buildChart(selectedSample);
});

// Populate dropdown menu with sample names
var dropdownMenu = d3.select("#selDataset");

data.names.forEach(function(name) {
  dropdownMenu.append("option").text(name).property("value", name);
});

// Initial chart rendering
buildCharts(data.names[0]);

// Function to build both bar and bubble charts based on the selected sample
function buildCharts(selectedSample) {
d3.json(url).then(function(data) {
  // Filter data for the selected sample
  var selectedData = data.samples.find(sample => sample.id === selectedSample);

  // Build bubble chart
  var bubbleTrace = {
    x: selectedData.otu_ids,
    y: selectedData.sample_values,
    text: selectedData.otu_labels,
    mode: 'markers',
    marker: {
      size: selectedData.sample_values,
      color: selectedData.otu_ids,
      colorscale: 'Earth' // You can choose a different colorscale if needed
    }
  };

  var bubbleLayout = {
    title: `Bubble Chart for ${selectedSample}`,
    xaxis: { title: 'OTU IDs' },
    yaxis: { title: 'Sample Values' }
  };

  Plotly.newPlot("bubbleChart", [bubbleTrace], bubbleLayout);
});
}

// Event listener for dropdown change
d3.select("#selDataset").on("change", function() {
var selectedSample = d3.select(this).property("value");
buildCharts(selectedSample);
});

 // Initial chart and metadata rendering
 buildCharts(data.names[0]);
 displayMetadata(data.names[0]);

// Function to build both bar and bubble charts based on the selected sample
function buildCharts(selectedSample) {
 d3.json(url).then(function(data) {
   // Filter data for the selected sample
   var selectedData = data.samples.find(sample => sample.id === selectedSample);

   // Build bubble chart
   var bubbleTrace = {
     x: selectedData.otu_ids,
     y: selectedData.sample_values,
     text: selectedData.otu_labels,
     mode: 'markers',
     marker: {
       size: selectedData.sample_values,
       color: selectedData.otu_ids,
       colorscale: 'Earth' // You can choose a different colorscale if needed
     }
   };

   var bubbleLayout = {
     title: `Bubble Chart for ${selectedSample}`,
     xaxis: { title: 'OTU IDs' },
     yaxis: { title: 'Sample Values' }
   };

   Plotly.newPlot("bubbleChart", [bubbleTrace], bubbleLayout);
 });
}

// Function to display metadata for the selected sample
function displayMetadata(selectedSample) {
 d3.json(url).then(function(data) {
   // Filter metadata for the selected sample
   var metadata = data.metadata.find(item => item.id.toString() === selectedSample);

   // Select the metadata div
   var metadataDiv = d3.select("#sample-metadata");

   // Clear existing metadata
   metadataDiv.html("");

   // Display metadata key-value pairs
   Object.entries(metadata).forEach(([key, value]) => {
     metadataDiv.append("p").text(`${key}: ${value}`);
   });
 });
}

// Event listener for dropdown change
d3.select("#selDataset").on("change", function() {
 var selectedSample = d3.select(this).property("value");
 buildCharts(selectedSample);
 displayMetadata(selectedSample);
});

