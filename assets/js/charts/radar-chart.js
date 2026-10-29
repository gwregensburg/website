function drawChart() {
   // Select all chart containers
   const chartContainers = document.querySelectorAll(".radar-chart-container");

   chartContainers.forEach((container) => {
       // Extract data from the container's attributes
       const chartId = container.id;
       const text = container.getAttribute("data-text");
       const subtext = container.getAttribute("data-subtext");
       const rawData = container.getAttribute("data-chart-data");
       const rawItems = container.getAttribute("items");

       // Parse the data (assumes JSON format)
       let chartData;
       try {
           chartData = JSON.parse(rawData);
           chartData = Object.entries(chartData).map(([key, value]) => ({
               name: key,
               value: value,
           }));
           items = JSON.parse(rawItems);
           console.log(`Parsed chart data for ${chartId}:`, chartData);
           console.log(`Parsed items for ${chartId}:`, items);
       } catch (error) {
           console.error(`Invalid chart data for ${chartId}:`, error);
           return;
       }

       // Extract categories and values for the bar chart

       // Initialize the chart
       const chart = echarts.init(container);

       // Define the chart options
       const option = {
           title: {
               text: text,
               subtext: subtext,
           },
           // left: 150,
           // right: 150,
           tooltip: {
               axisPointer: {
                   type: "shadow", // Use a shadow pointer for bar charts
               },
           },
           legend: {
               data: chartData.map((item) => item.name),
               top: 0,
           },
           radar: {
               indicator: items.map((item) => {
                   let newData = [];
                   chartData.forEach((data) => newData.push(Math.max(...data.value)))
                   const maxValue = Math.max(...newData);

                   console.log(...chartData.map((data) => Math.max(data.value))); 
                   return {
                       name: item.length > 30 ? item.replace(/(.{1,30})(\s|$)/g, "$1\n").trim() : item,
                       max: maxValue,
                   };
               }),
               radius: "70%",
           },
           series: {
               type: "radar",
               data: chartData,
           },
       };

       // Set the options
       chart.setOption(option);
       console.log(option);
   });
}

if (window.screen.orientation) {
    window.screen.orientation.addEventListener('change', () => {
        console.log("Screen orientation changed, resizing charts...");
        window.location.reload();
    }
    );
}

document.addEventListener("DOMContentLoaded", drawChart);