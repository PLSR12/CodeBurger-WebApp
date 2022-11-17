/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import {
  useFilters,
  usePagination,
  useSortBy,
  useTable,
  useAsyncDebounce,
  useGlobalFilter,
} from 'react-table'
import { Pagination } from '../../../components/Atoms/Pagination'
import * as S from './styles'

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <S.BoxSearchBar>
      <div className="text-field-container">
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
        />
      </div>
    </S.BoxSearchBar>
  )
}

export function Table({
  columns,
  data,
  title,
  subTitle,
  exportConfig,
  extraButton,
}) {
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState({
    itemsPerPage: 10,
  })

  function columnSorted(columnTypeSort) {
    if (columnTypeSort.isSorted && columnTypeSort.isSortedDesc) {
      return <MdArrowDropDown size={18} />
    }

    if (columnTypeSort.isSorted) {
      return <MdArrowDropUp size={18} />
    }

    return null
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pagination.itemsPerPage,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [...columns])
    }
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    gotoPage,
    pageOptions,
    state,
    state: { pageIndex },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance

  return (
    <>
      <S.ContainerHeaderTable>
        <S.BoxHeader>
          <S.HeaderTitle>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
          </S.HeaderTitle>

          <S.BoxRightBar>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            {extraButton}
          </S.BoxRightBar>
        </S.BoxHeader>
      </S.ContainerHeaderTable>

      <S.ContainerSearchTable>
        <S.BoxFastFilters></S.BoxFastFilters>
      </S.ContainerSearchTable>

      <S.ContainerTable>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    title="Ordenar por"
                    {...column.getHeaderProps({
                      style: { maxWidth: column.maxWidth, width: column.width },
                    })}
                  >
                    {column.render('Header')}
                    <span className="iconSortBy">
                      {!column.isSorted && <MdArrowDropUp size={18} />}
                    </span>
                    <span>{columnSorted(column)}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row)
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {page.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <p style={{ textAlign: 'center' }}>
                    {' '}
                    Nenhum registro encontrado{' '}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </S.ContainerTable>

      <S.ContainerFooter>
        <div>
          <p>Total de {page.length} registros encontrados. </p>
        </div>
        <div>
          <p>Exibir</p>
          <div>
            <select
              aria-label="Default select"
              value={pagination.itemsPerPage}
              onChange={(event) => {
                setPagination({
                  ...pagination,
                  itemsPerPage: Number(event.target.value),
                })
                setPageSize(Number(event.target.value))
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <p>Registros por página</p>
        </div>
        <Pagination gotoPage={gotoPage} pageOptions={pageOptions} />
      </S.ContainerFooter>
    </>
  )
}
