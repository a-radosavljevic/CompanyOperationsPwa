import React from "react";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      className="form-control"
      type="text"
      defaultValue={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Претрага`}
    />
  )
}

/**
*@param rows - niz svih podataka
*@param id - kolona po kojoj se vrsi pretraga
*@param filterValue - podatak koji se pretrazuje
*@return niz filtriranih podataka
**/
function textFilterFunction(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.original[id]] });
}

// Let the table remove the filter if the string is empty
textFilterFunction.autoRemove = val => !val

const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id }, array: array }) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="form-control"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Svi</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function dateBetweenFilterFn(rows, id, filterValue) {
  const value = filterValue ? new Date(filterValue) : undefined;
  if (value) {
    return rows.filter((r) => {
      const cellDate = new Date(r.values[id]);
      var date = cellDate.getDate();
      var month = cellDate.getMonth();
      var year = cellDate.getFullYear();

      return date == value.getDate() && month == value.getMonth() && year == value.getFullYear();
    });
  } else {
    return rows;
  }
}

function DateRangeColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <DatePicker
        className="form-control"
        selected={filterValue}
        onChange={(date) => setFilter(date)}
        placeholderText="Изабери датум"
        showMonthDropdown
        useShortMonthInDropdown
        isClearable
        dateFormat={'dd.MM.yyyy'}
      />
    </div>
  );
}

export { DefaultColumnFilter, textFilterFunction, SelectColumnFilter, dateBetweenFilterFn, DateRangeColumnFilter }