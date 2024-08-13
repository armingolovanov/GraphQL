function createPieChart(data) {
  const svg = document.getElementById("pieChart");
  const width = svg.getAttribute("width");
  const height = svg.getAttribute("height");
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  // Define colors and labels for legend
  const colorsArray = ["#d5e91e", "#a1b800", "#6e8900", "#415d00", "#273200"];

  // Calculate the total value to ensure slices sum to 100%
  const totalValue = data.reduce((sum, slice) => sum + slice.value, 0);

  let cumulativeAngle = 0;
}
