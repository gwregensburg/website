document.addEventListener('DOMContentLoaded', () => {
    // Select all chart containers
    const chartContainers = document.querySelectorAll('.single-axis-chart-container');

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
            chartData.sort((a, b) => a[0] - b[0]);

            // chartData = Object.entries(chartData).map(([key, value]) => ({
            //     name: key,
            //     data: value,
            //     type: 'scatter',
            //     // label: {show: true, formatter: '{c}  {a}', position: 'outside'},
            // }));

        } catch (error) {
            console.error(`Invalid chart data for ${chartId}:`, error);
            return;
        }

        console.log(`Parsed chart data for ${chartId}:`, chartData);

        // Extract categories and values for the bar chart

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
                // trigger: 'axis',
                axisPointer: {
                    type: 'shadow' // Use a shadow pointer for bar charts
                },
                formatter: function (params) {
                    return `<div style="text-align: center;"><b>${params.data[0]}</b><br>Anzahl: ${params.data[1]}</div>`;
                }
            },
            singleAxis: {
                // type: 'category',
                // data: items,
                // boundaryGap: false,
                // height: 150,
                min: 'dataMin',
                max: 'dataMax',
                interval: 5,
                bottom: 50
            },
            series: {
                coordinateSystem: 'singleAxis',
                singleAxisIndex: 0,
                type: 'scatter',
                data: chartData,
                symbolSize: function (dataItem) {
                  return dataItem[1] * 10;
                },
                label: {
                    show: true, // Enable labels
                    formatter: '{@[1]}',
                    position: 'outside' // Position the labels outside the pie chart
                },
            }
        };

        // Set the options
        chart.setOption(option);
        console.log(chart);
        console.log(option);
    });
});