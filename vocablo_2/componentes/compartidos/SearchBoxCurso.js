import React, { useState } from "react";
/**
 * Componente que muestra un input para hacer búsquedas por nombre entre un listado de objetos. Al introducir un dato muestra debajo los datos coincidentes con el valor del input
 * @param {Array} suggestions Un array de objetos que contengan las propiedades "nombre" y "_id"
 * @returns
 */
const SearchBox = ({ suggestions, setSeleccion, cambiarPrimeraPagina }) => {
  const [value, setValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  /**
   *Retorna un array con los objetos cuya propiedad "nombre" coincida con el parámetro de búsqueda "value".No hace distinción entre valores en mayúsculas y minúsculas
   * @param {String} value valor de búsqueda
   * @returns {Array}
   */
  const getSuggestions = (value) => {
    return suggestions.filter((suggestion) =>
      suggestion.nombre.toLowerCase().includes(value.toLowerCase())
    );
  };

  /**
   * Almacena los cambios realizados en el input en el estado "value" y almacena las coincidencias resultantes en el estado "filteredSuggestions"
   * @param {*} event
   */
  const onInputChange = (event) => {
    const value = event.target.value;
    setValue(value);
    setFilteredSuggestions(getSuggestions(value));
  };
  /**
   * Al hacer click sobre alguna de las sugerencias coincidentes con el valor del input, coge dicha selección y la almacena finalmente en el estado "value" y "filteredSuggestions"
   * @param {*} suggestion
   */
  const onSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <>
      <div className="search-box-container">
        <input
          className="input w-75"
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder="Curso..."
        ></input>
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions w-75 text-start">
            <li
              className="text-warning"
              key={"000"}
              onClick={() => {
                setSeleccion({
                  _id: "",
                  nombre: "todos",
                  apellidos: "",
                  curso: "",
                  grupo: "",
                });
                onSuggestionClick("");
                cambiarPrimeraPagina();
              }}
            >
              Lista completa
            </li>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSeleccion(suggestion);
                  onSuggestionClick(suggestion.nombre);
                }}
              >
                {suggestion.nombre} {suggestion.apellidos}
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>{`
        .search-box-container {
          position: relative;
        }

        .input {
          width: 100%;
          padding: 10px;
          padding-left:30px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .suggestions {
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          top: 100%;
          right:0;
          
          z-index: 1;
          max-height: 200px;
          overflow-y: auto;
          background-color: white;
          border: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 4px 4px;
        }

        .suggestions li {
          padding: 10px;
          cursor: pointer;
        }

        .suggestions li:hover {
          background-color: #f2f2f2;
        }
    `}</style>
    </>
  );
};

export default SearchBox;
