import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import {useState} from "react";
import Filter from './Filter'


const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => setDataTable(value);

    //количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);
   
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
   
    //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
    <span key={ index } onClick={changeActive}> { item } </span>
    );
    return(
        <>
            <Filter filtering={ updateDataTable } data={ dataTable }
                fullData={ props.data }/>
            <table>
                <TableHead head={ Object.keys(props.data[0]) } />
                <TableBody body={ dataTable } amountRows={props.amountRows}
                    numPage={activePage} />
            </table>
            {n > 1 && (<div>
                {pages}
            </div>)}
        </>
    )
   }
   export default Table;
   