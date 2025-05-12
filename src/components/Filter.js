const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Год": [
                event.target["year_min"].value ? parseInt(event.target["year_min"].value) : null,
                event.target["year_max"].value ? parseInt(event.target["year_max"].value) : null
            ],
            "Высота": [
                event.target["height_min"].value ? parseFloat(event.target["height_min"].value) : null,
                event.target["height_max"].value ? parseFloat(event.target["height_max"].value) : null
            ]
        };
       
        let arr = props.fullData;
        for (const key in filterField) {
            if (key === "Год" || key === "Высота") {
                const [min, max] = filterField[key];
                if (min !== null) {
                    arr = arr.filter(item => item[key] >= min);
                }
                if (max !== null) {
                    arr = arr.filter(item => item[key] <= max);
                }
            } else if (filterField[key]) {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key]));
            }
        }
        props.filtering(arr);
    }
    const handleReset = (event) => {
        //event.preventDefault(); 
        event.target.reset();
        props.filtering(props.fullData);
    };
    
    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип:</label>
                <input name="type" type="text" />
            </p>
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>
            <p>
                <label>Год от:</label>
                <input name="year_min" type="number" />
            </p>
            <p>
                <label>Год до:</label>
                <input name="year_max" type="number" />
            </p>
            <p>
                <label>Высота от:</label>
                <input name="height_min" type="number" step="0.1" />
            </p>
            <p>
                <label>Высота до:</label>
                <input name="height_max" type="number" step="0.1" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтры</button>
            </p>
        </form>
    )
}
export default Filter;