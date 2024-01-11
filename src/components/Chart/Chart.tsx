import { useState, useEffect, SetStateAction } from 'react';
import { AgChartsReact } from 'ag-charts-react';

const ChartExample = ({ data }:{data:any}) => {
  
  const [selectedFilter, setSelectedFilter] = useState('monthly');
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setChartOptions({
      data,
      series: [
        {
          type: 'bar',
          xKey: selectedFilter === 'monthly' ? 'month' : 'year',
          yKey: 'totalEarnings',
          yName: 'Total Earnings',
          fill: 'lightGreen',
        },
      ],
    });
  }, [selectedFilter, data]);

  const handleFilterChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className=''>
      <div className='flex justify-around items-center m-2'>
        <label htmlFor='timeFilter' className='text-white px-3 sm:text-xs md:text-sm lg:text-base xl:text-base '>
          Select Period:
        </label>
        <select
          id='timeFilter'
          className='rounded-md text-center sm:text-xs md:text-sm lg:text-base xl:text-base'
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      <h2 className='text-center text-white'>{`${selectedFilter.charAt(0).toUpperCase()}${selectedFilter.slice(1)} Earnings`}</h2>
      <AgChartsReact options={chartOptions} />
    </div>
  );
};

export default ChartExample;
