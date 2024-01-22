// Define the URL for the JSON data
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the data using D3
d3.json(url).then(function(data) {
  // Populate dropdown menu with sample names
  var dropdownMenu = d3.select("#selDataset");

  data.names.forEach(function(name) {
    dropdownMenu.append("option").text(name).property("value", name);
  });

  // Initial chart and metadata rendering
  buildCharts(data.names[0]);
  displayMetadata(data.names[0]);
});

// Function to build both bar and bubble charts based on the selected sample
function buildCharts(selectedSample) {
  d3.json(url).then(function(data) {
    // Filter data for the selected sample
    var selectedData = data.samples.find(sample => sample.id === selectedSample);

    // Build bar chart
    var barTrace = {
      x: selectedData.sample_values.slice(0, 10).reverse(),
      y: selectedData.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
      text: selectedData.otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    var barLayout = {
      title: `Top 10 OTUs for ${selectedSample}`,
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };

    Plotly.newPlot("bar", [barTrace], barLayout);

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

    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
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
function optionChanged(selectedSample) {
  buildCharts(selectedSample);
  displayMetadata(selectedSample);
}


