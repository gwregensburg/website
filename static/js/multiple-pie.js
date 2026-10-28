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