import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Task from './components/Task.js';

function App() {
  return (
    <> 
      <h3>Самые высокие здания и сооружения</h3>
      <Table data={buildings} amountRows="10"/>
    </>
  );
}

/*function App() {
  const authorsData = [
    { author: "Пушкин", books: ["1", "2", "3"] },
    { author: "Достоевский", books: ["4", "5"] },
    { author: "Булгаков", books: ["6", "7", "8", "9"] }
    ];
  return (
    <> 
      <Task data={authorsData}/>
    </>
  );
}*/

export default App;
