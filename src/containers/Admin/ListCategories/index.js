import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useMemo, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import {
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import { toast } from 'react-toastify'
import ImgLoading from '../../../assets/img/loading.gif'
import { Pagination } from '../../../components/Atoms/Pagination'
import * as Molecules from '../../../components/Molecules'
import GenericModal from '../../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../../components/Molecules/Modal/styles'
import api from '../../../services/api'
import * as S from './styles'
import { TableActions, TableFilter } from './TableTools'

function ListCategories() {
  const [data, setData] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)
  const { push } = useHistory()
  const [idToAction, setIdToAction] = useState()
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] = useState(
    false
  )
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState({
    itemsPerPage: 10,
  })

  const titleModalDelete = 'Excluir Categoria'
  const textModalDelete = '\nDeseja realmente excluir esse Categoria?'

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'url',
        Cell: ({ row }) => {
          const data = row.original
          const imageProduct = data.url

          return (
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <img
                src={imageProduct}
                alt="imagem do produto"
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </div>
          )
        },
      },
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Ações',
        accessor: 'options',
        Cell: ({ row }) => {
          const data = row.original

          return (
            <TableActions>
              <MenuItem onClick={() => handleModalConfirmDelete(data)}>
                Excluir
              </MenuItem>{' '}
            </TableActions>
          )
        },
        disableSortBy: true,
        width: 30,
      },
    ],
    []
  )

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')
      setData(data)
      setModalLoadingIsOpen(false)
    }
    loadCategories()
  }, [])

  function handleNewCategorie() {
    push('/categoria/criar')
  }

  function handleModalConfirmDelete(row) {
    setIdToAction(row.id)
    setModalConfirmDeleteIsOpen(true)
  }

  const handleModalConfirmDeleteYes = async () => {
    await toast.promise(api.delete(`/categories/${idToAction}`), {
      success: 'Categorias deletada com sucesso',
      error: 'Falha ao deletar Categorias',
    })

    setTimeout(() => {
      setIdToAction('')
      setModalConfirmDeleteIsOpen(false)
      window.location.reload()
    }, 2000)
  }

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
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <S.InputCheckbox
                {...getToggleAllPageRowsSelectedProps()}
                title="Marcar/desmarcar todos os itens da página atual"
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <S.InputCheckbox
                {...row.getToggleRowSelectedProps()}
                title="Marcar/desmarcar este item"
              />
            </div>
          ),
          maxWidth: 60,
          width: 60,
        },
        ...columns,
      ])
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
    state: { pageIndex },
    setFilter,
  } = tableInstance

  return (
    <>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>
      <Molecules.Modal
        isOpen={modalConfirmDeleteIsOpen}
        onRequestClose={() => setModalConfirmDeleteIsOpen(false)}
        ariaHideApp
        title={titleModalDelete}
        text={textModalDelete}
        handleNo={() => setModalConfirmDeleteIsOpen(false)}
        textNo="Não"
        handleYes={handleModalConfirmDeleteYes}
        textYes="Sim, excluir"
      />
      <S.ContainerHeaderTable>
        <S.BoxHeader>
          <S.HeaderTitle>
            <h1>Categorias</h1>
            <h2>Listagem de categorias</h2>
          </S.HeaderTitle>

          <S.BoxRightBar>
            <S.BoxSearchBar>
              <div className="text-field-container">
                <TextField
                  variant="outlined"
                  placeholder="Buscar por Nome"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    if (e.target.value.length >= 3) {
                      setFilter('name', e.target.value)
                    } else {
                      setFilter('name', '')
                    }
                  }}
                />
              </div>
            </S.BoxSearchBar>
            <S.ButtonCreate onClick={() => handleNewCategorie()}>
              <p>Adicionar nova Categoria</p>
            </S.ButtonCreate>
          </S.BoxRightBar>
        </S.BoxHeader>
      </S.ContainerHeaderTable>

      <S.ContainerSearchTable>
        <S.BoxFastFilters>
          <p>Filtros Rápidos</p>
          <TableFilter label="Recentes">
            <MenuItem
              onClick={(e) => console.log(e)}
              selected={filters?.recents === 1}
            >
              Hoje
            </MenuItem>
            <MenuItem
              onClick={(e) => console.log(e)}
              selected={filters?.recents === 3}
            >
              Ultimos 3 dias
            </MenuItem>
            <MenuItem
              onClick={(e) => console.log(e)}
              selected={filters?.recents === 7}
            >
              Ultimos 7 dias
            </MenuItem>
            <MenuItem
              onClick={(e) => console.log(e)}
              selected={filters?.recents === 15}
            >
              Ultimos 15 dias
            </MenuItem>
            <MenuItem
              onClick={(e) => console.log(e)}
              selected={filters?.recents === 30}
            >
              Ultimos 30 dias
            </MenuItem>
          </TableFilter>
        </S.BoxFastFilters>
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
          </tbody>
        </table>
      </S.ContainerTable>

      <S.ContainerFooter>
        <div>
          <p>Total de {data.length} Categorias encontrados. </p>
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
          <p>Categorias por página</p>
        </div>
        <Pagination gotoPage={gotoPage} pageOptions={pageOptions} />
      </S.ContainerFooter>
    </>
  )
}

export default ListCategories
