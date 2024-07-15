function displayXpChart(xpData) {
  const chartContainer = document.getElementById("userXp");
  chartContainer.innerHTML = "";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const barWidth = 45; // Width of each bar
  const spaceBetweenChar = 25; // Space between bars
  const maxAmount = Math.max(...xpData.map((item) => item.amount));
  const chartHeight = 300; // Fixed height for the chart area

  svg.setAttribute("width", xpData.length * (barWidth + spaceBetweenChar));
  svg.setAttribute("height", 300);

  xpData.forEach((item, index) => {
    const barHeight = (item.amount / maxAmount) * chartHeight * 0.8; // Scale bar height to chart height
    const xPos = index * (barWidth + spaceBetweenChar);
    const yPos = chartHeight - barHeight; // Position bars from the top down

    const bar = document.createElementNS(svgNS, "rect");
    bar.setAttribute("x", xPos);
    bar.setAttribute("y", yPos);
    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", barHeight);
    bar.style.fill = "#d5e91e";

    const showXpAmount = document.createElementNS(svgNS, "text");
    showXpAmount.setAttribute("x", xPos + barWidth / 2);
    showXpAmount.setAttribute("y", yPos); // Position text above the bar
    showXpAmount.setAttribute("text-anchor", "middle");
    showXpAmount.style.fill = "black";
    showXpAmount.textContent = `${item.amount} Kb`;

    const showProjectName = document.createElementNS(svgNS, "text");
    const nameX = xPos + barWidth / 2;
    const nameY = chartHeight + 10; // Adjust this value to fine-tune the vertical position
    showProjectName.setAttribute("x", nameX);
    showProjectName.setAttribute("y", nameY); // Position text at the bottom of the chart area
    showProjectName.setAttribute("text-anchor", "middle");
    showProjectName.style.fill = "white";
    showProjectName.textContent = item.name;
    // Rotate the text
    showProjectName.setAttribute("transform", `rotate(90 ${nameX} ${nameY})`);

    svg.appendChild(bar);
    svg.appendChild(showXpAmount);
    svg.appendChild(showProjectName);
  });

  chartContainer.appendChild(svg);
}
