document.addEventListener('DOMContentLoaded', () => {
    // Select all chart containers
    const chartContainers = document.querySelectorAll('.bar-chart-container');

    chartContainers.forEach(container => {
        // Extract data from the container's attributes
        const chartId = container.id;
        const text = container.getAttribute('data-text');
        const subtext = container.getAttribute('data-subtext');
        const rawData = container.getAttribute('data-chart-data');
        const rawItems = container.getAttribute('items');
        const rotated = container.getAttribute('rotated') == "true" ? true : false;

        console.log("rotated");
        console.log(rotated);

        // Parse the data (assumes JSON format)
        let chartData;
        try {
            chartData = JSON.parse(rawData);
            chartData = Object.entries(chartData).map(([key, value]) => ({
                name: key,
                data: value,
                type: 'bar',
                label: {show: true, formatter: '{c}  {a}', position: 'outside'},
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

        const yAxis = rotated ? {
            data: items,
            axisLabel: {
                rotate: 0, // Rotate labels for better readability if needed
                interval: 0, // Show all labels
                width: 150,
                overflow: 'break',
                position: 'right',
                margin: 5,
            },
            inverse: true,
        } : {
            type: 'value'
        };
        
        const xAxis = rotated ? {
            type: 'value'
        } : {
            data: items,
            axisLabel: {
                rotate: 0, // Rotate labels for better readability if needed
                interval: 0, // Show all labels
            }
        };

        // Define the chart options
        const option = {
            title: {
            text: text,
            subtext: subtext,
            left: 'center'
            },
            grid: rotated ? {
            left: 150
            } : {},
            tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow' // Use a shadow pointer for bar charts
            }
            },
            // legend: {
            //     data: chartData.map(item => item.name),
            //     top: 0
            // },
            xAxis,
            yAxis,
            series: chartData
        };

        // Set the options
        chart.setOption(option);
        console.log(chart);
        console.log(option);
    });
});