import styled from "styled-components";
export const TableScrollContainer = styled.div`
  overflow-x: auto;
  padding-bottom: 8px;
`;
export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  table {
    width: 100%;
    border-spacing: 0;
    tr th {
      text-align: left;
      background-color: #fff;
      color: #333;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 2px;
      padding-right: 2px;
      font-weight: 500;
      border-bottom: 2px solid #333;
    }
    tr td {
      border-bottom: 1px solid #e5e5e5;
      text-align: left;
      padding-left: 2px;
      padding-right: 2px;
    }
    th.fixed-100 {
      width: 100px;
      max-width: 100px;
      min-width: 100px;
    }
    th.fixed-80 {
      width: 80px;
      max-width: 80px;
      min-width: 80px;
    }
  }
  .pagination {
    padding: 0.5rem;
    width: 100%;
  }
`;

export const PaginateButton = styled.button`
  border: 1px solid #ddd;
  background-color: #fff;
  color: #1583c3;

  &:disabled {
    background-color: #efefef;
    color: #555;
    opacity: 0.5;
  }

  &:first-of-type {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const PaginateSelect = styled.select`
  width: 135px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
`;


export const TablePadding = styled.div`
table {
    tr th {
      padding-left: 7px;
      padding-right: 7px;
    }
    tr td {
      padding-left: 7px;
      padding-right: 7px;
    }
  }
`