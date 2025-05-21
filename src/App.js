// App.js
import './CSS/App.css';
import buildings from './data.js';
import { useState } from 'react';
import Table from './components/Table.js';
import Chart from './components/Chart.js';

function App() {
  const [fullData] = useState(buildings);
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <>
      <h3>Самые высокые здания и сооружения</h3>
      <Chart data={filteredData} />
      <Table 
        data={filteredData} 
        fullData={fullData}
        setFilteredData={setFilteredData}
        amountRows="10"
        usePagination={false}
/>
      
    </>
  );
}

export default App;
