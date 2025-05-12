import { useState } from 'react';

const Task = ({data}) => {
    const [selectedAuthor, setAuthor] = useState('Нет');

    const authorChange = (event) => {setAuthor(event.target.value)};

    const authorObj = data.filter(item => item.author === selectedAuthor)[0]
    const selectedBooks = authorObj ? authorObj.books : ['Нет'];
    
    return (
        <div>
            <p>
                <label>Автор:</label>
                <select value={selectedAuthor} onChange={             authorChange            }>
                    <option value=" ">Нет</option>
                    {data.map((item) => <option>{item.author}</option>)}
                </select>
            </p>
            <p>
                <label>Книги:</label>
                <select>
                    {selectedBooks.map((book) => (<option>{book}</option>))}
                </select>
            </p>
        </div>
    );
};

export default Task;