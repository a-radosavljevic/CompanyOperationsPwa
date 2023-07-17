import React, {
    useEffect,
    useReducer,
    useState,
    useMemo,
    forwardRef,
    useRef,
  } from "react";
  import {
    usePagination,
    useTable,
    useSortBy,
    useBlockLayout,
    useFilters,
    useRowSelect,
  } from "react-table";
  import { DndProvider } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
  import update from "immutability-helper";
  import { useTranslation } from "react-i18next";
  import {
    TableContainer,
    TableScrollContainer,
    PaginateButton,
    FlexDiv,
    PaginateSelect,
  } from "./Table.style";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
  import Loader from "../loader/Loader.component";
  import Row from "./row.component";
  import {
    DefaultColumnFilter,
    textFilterFunction,
  } from "./filterHelpFunction.component";
  
  const PAGE_CHANGED = "PAGE_CHANGED";
  const PAGE_SIZE_CHANGED = "PAGE_SIZE_CHANGED";
  const TOTAL_COUNT_CHANGED = "TOTAL_COUNT_CHANGED";
  const PAGE_SORT_CHANGED = "PAGE_SORT_CHANGED";
  
  const initialState = {
    queryPageIndex: 0,
    queryPageSize: 10,
    queryPageSortBy: [],
    totalCount: 0,
  };
  
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case PAGE_CHANGED:
        return {
          ...state,
          queryPageIndex: payload,
        };
      case PAGE_SIZE_CHANGED:
        return {
          ...state,
          queryPageSize: payload,
        };
      case PAGE_SORT_CHANGED:
        return {
          ...state,
          queryPageSortBy: payload,
        };
      case TOTAL_COUNT_CHANGED:
        return {
          ...state,
          totalCount: payload,
        };
      default:
        throw new Error(`Unhandled action type: ${type}`);
    }
  };
  
  const trimData = (data = []) => data.map(({ ...x }) => ({ ...x }));
  
  const mapSortObject = (data = []) =>
    data.map((x) => {
      return { sortDirection: Number(x.desc), columnName: x.id };
    });
  
  function Table({
    columns,
    data,
    serverSide,
    fetchFunction,
    setData,
    hiddenColumn,
    rowSortable,
    handleClickOnRow,
    onRowSelectStateChange,
  }) {
    const defaultColumn = useMemo(
      () => ({
        disableFilters: true,
        Filter: DefaultColumnFilter,
      }),
      []
    );
  
    const [
      { queryPageIndex, queryPageSize, totalCount, queryPageSortBy },
      dispatch,
    ] = useReducer(reducer, initialState);
  
    const filterTypes = useMemo(
      () => ({
        textSearch: textFilterFunction,
      }),
      []
    );
  
    const moveRow = (dragIndex, hoverIndex) => {
      const dragRecord = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRecord],
          ],
        })
      );
    };
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      footerGroups,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize, sortBy, selectedRowIds },
    } = useTable(
      {
        columns: columns,
        data: serverSide ? trimData(data?.dataList) : data,
        initialState: {
          pageIndex: queryPageIndex,
          pageSize: queryPageSize,
          totalCount: serverSide ? data?.count : data.length,
          hiddenColumns: hiddenColumn ? hiddenColumn : "",
          selectedRow: null,
          sortBy: queryPageSortBy,
          rowSortable: false,
        },
        manualPagination: serverSide ? true : false, // Tell the usePagination
        // hook that we'll handle our own data fetching.This means we'll also have to provide our own pageCount.
        manualSortBy: serverSide ? true : false,
        pageCount: Math.ceil(totalCount / queryPageSize),
        defaultColumn,
        filterTypes,
      },
      serverSide ? "" : useFilters,
      useSortBy,
      usePagination,
      onRowSelectStateChange ? useRowSelect : "",
      (hooks) => {
        onRowSelectStateChange &&
          hooks.visibleColumns.push((columns) => {
            return [
              {
                id: "selection",
                // Make this column a groupByBoundary. This ensures that groupBy columns
                // are placed after it
                groupByBoundary: true,
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                  <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
              ...columns,
            ];
          });
      }
    );
    const [selectedRow, setSelectedRow] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const { t } = useTranslation();
  
    useEffect(() => {
      setSelectedRow(null);
      dispatch({ type: PAGE_CHANGED, payload: pageIndex });
      if (serverSide) {
        setIsLoading(true);
        fetchFunction(pageIndex + 1, pageSize, mapSortObject(sortBy)).then(
          (res) => {
            setData(res);
            setIsLoading(false);
          }
        );
      }
    }, [pageIndex]);
  
    useEffect(() => {
      dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
      gotoPage(0);
      if (serverSide) {
        setIsLoading(true);
        fetchFunction(pageIndex + 1, pageSize, mapSortObject(sortBy)).then(
          (res) => {
            setData(res);
            setIsLoading(false);
          }
        );
      }
    }, [pageSize, gotoPage]);
  
    useEffect(() => {
      dispatch({ type: PAGE_SORT_CHANGED, payload: sortBy });
      gotoPage(0);
      if (serverSide) {
        setIsLoading(true);
        fetchFunction(pageIndex + 1, pageSize, mapSortObject(sortBy)).then(
          (res) => {
            setData(res);
            setIsLoading(false);
          }
        );
      }
    }, [sortBy, gotoPage]);
  
    useEffect(() => {
      setSelectedRow(null);
      rowSortable && setData(data);
    }, [data]);
  
    useEffect(() => {
      setSelectedRow(null);
      gotoPage(0);
      if (data?.count || data?.length) {
        dispatch({
          type: TOTAL_COUNT_CHANGED,
          payload: serverSide ? data.count : data.length,
        });
      }
    }, [data?.length, data?.count]);
  
    const IndeterminateCheckbox = forwardRef(
      ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();
        const resolvedRef = ref || defaultRef;
  
        useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);
  
        return (
          <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
        );
      }
    );
  
    useEffect(
      () => onRowSelectStateChange?.(Object.keys(selectedRowIds)),
      [onRowSelectStateChange, selectedRowIds]
    );
  
    return (
      <TableContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {(data?.count || data?.length) < 10 ? (
              <></>
            ) : (
              <PaginateSelect
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Прикажи {pageSize}
                  </option>
                ))}
              </PaginateSelect>
            )}
  
            <TableScrollContainer>
              <DndProvider backend={HTML5Backend}>
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup, index) => (
                      <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {rowSortable && <th style={{ width: "50px" }}></th>}
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            style={{ maxWidth: column.maxWidth }}
                            className={column.className}
                          >
                            <div {...column.getSortByToggleProps()}>
                              {column.render("Header")}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <FontAwesomeIcon
                                      className="arrow-down-short-wide"
                                      icon={solid("arrow-down-short-wide")}
                                      pull="right"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="arrow-down-wide-short"
                                      icon={solid("arrow-down-wide-short")}
                                      pull="right"
                                    />
                                  )
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                            <div />
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.length > 0 &&
                      (rowSortable
                        ? page.map(
                            (row, index) =>
                              prepareRow(row) || (
                                <Row
                                  key={index}
                                  index={index}
                                  row={row}
                                  moveRow={moveRow}
                                />
                              )
                          )
                        : page.map((row, index) => {
                            prepareRow(row);
                            return (
                              <tr
                                className={
                                  index === selectedRow ? "selectedRow" : ""
                                }
                                {...row.getRowProps()}
                              >
                                {row.cells.map((cell) => (
                                  <td
                                    key={index}
                                    onClick={
                                      cell.value
                                        ? () => {
                                            if (
                                              typeof handleClickOnRow ===
                                              "function"
                                            )
                                              setSelectedRow(index);
                                            return typeof handleClickOnRow ===
                                              "function"
                                              ? handleClickOnRow(row.original)
                                              : undefined;
                                          }
                                        : undefined
                                    }
                                    {...cell.getCellProps()}
                                  >
                                    {cell.render("Cell")}
                                  </td>
                                ))}
                              </tr>
                            );
                          }))}
                  </tbody>
                </table>
              </DndProvider>
            </TableScrollContainer>
            {page.length === 0 && (
              <span className="noResult">Није пронађен ниједан резултат</span>
            )}
            {data?.count < pageSize || data?.length < pageSize ? (
              <></>
            ) : (
              <div className="pagination">
                <div>
                  {t("Page")}&nbsp;
                  <strong>
                    {pageIndex + 1} {t("of")} {pageOptions.length}
                  </strong>
                </div>
                <FlexDiv>
                  <PaginateButton
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    <FontAwesomeIcon icon={solid("chevron-left")} />
                    <FontAwesomeIcon icon={solid("chevron-left")} />
                  </PaginateButton>
                  <PaginateButton
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <FontAwesomeIcon icon={solid("chevron-left")} />
                  </PaginateButton>
                  <input
                    className="form-control"
                    type="number"
                    value={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: "80px" }}
                  />
                  <PaginateButton
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <FontAwesomeIcon icon={solid("chevron-right")} />
                  </PaginateButton>
                  <PaginateButton
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    <FontAwesomeIcon icon={solid("chevron-right")} />
                    <FontAwesomeIcon icon={solid("chevron-right")} />
                  </PaginateButton>
                </FlexDiv>
              </div>
            )}
          </>
        )}
      </TableContainer>
    );
  }
  
  export default Table;
  