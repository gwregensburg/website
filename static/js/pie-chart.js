document.addEventListener('DOMContentLoaded', () => {
    // Select all chart containers
    const chartContainers = document.querySelectorAll('.pie-chart-container');

    chartContainers.forEach(container => {
        // Extract data from the container's attributes
        const chartId = container.id;
        const text = container.getAttribute('data-text');
        const subtext = container.getAttribute('data-subtext');
        const rawData = container.getAttribute('data-chart-data');

        // Parse the data (assumes JSON format)
        let chartData;
        try {
            chartData = JSON.parse(rawData);
            chartData = Object.entries(chartData).map(([key, value]) => ({
                name: key,
                value: value
            }));
        } catch (error) {
            console.error(`Invalid chart data for ${chartId}:`, error);
            return;
        }

        // Initialize the chart
        const chart = echarts.init(container);

        // Define the chart options
        const option = {
            title: {
                text: text,
                subtext: subtext,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left'
            // },
            dataset: {
                source: [
                  ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                  ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                  ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                  ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                  ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
              },
            series: [
                {
                    name: text,
                    type: 'pie',
                    radius: '50%',
                    data: chartData,
                    label: {
                        show: true, // Enable labels
                        formatter: '{b}: {c}', // Format: name, value, and percentage
                        position: 'outside' // Position the labels outside the pie chart
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        // Set the options
        chart.setOption(option);
    });
});