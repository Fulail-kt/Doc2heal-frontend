import { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { AgPieSeriesOptions } from 'ag-charts-community';

// Chart Component
const PieChart = ({ data }: { data: any }) => {
  const [chartOptions, setChartOptions] = useState({
    data: [{}], // Initialize with empty data
    title: {
      text: 'Booking Status',
    },
    series: [{
      type: 'pie',
      angleKey: 'value',
      labelKey: 'status',
      calloutLabelKey: 'status',
      innerRadiusRatio: 0.7,
    } as AgPieSeriesOptions], 
  });

  useEffect(() => {
    // Process and set data only when `data` prop changes
    const processedData = getData(data);
    setChartOptions({ ...chartOptions, data: processedData });
  }, [data]);

  function getData(data: any) {
    return Object.keys(data).map((status) => ({
      status,
      value: data[status],
    }));
  }

  return (
    <div className='h-full py-10'>
      <AgChartsReact options={chartOptions} />
    </div>
  );
};

export default PieChart;
