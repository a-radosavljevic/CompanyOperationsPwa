import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

function convertLocalToUTCDate(date) {
  if (date) return new Date(moment.utc(date.toDateString()).format());
  else return null;
}

export default function CustomDatePicker({ onChange, ...props }) {
  return (
    <DatePicker
      dateFormat="dd.MM.yyyy"
      className="form-control"
      onChange={(date) => onChange(convertLocalToUTCDate(date))}
      {...props}
      isClearable
    />
  );
}
