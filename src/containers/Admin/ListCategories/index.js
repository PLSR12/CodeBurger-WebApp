import MenuItem from '@mui/material/MenuItem'
import { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Molecules from '../../../components/Molecules'
import api from '../../../services/api'
import { TableActions } from '../../../components/Molecules/Table/TableTools'
import * as S from './styles'

function ListCategories() {
  const [data, setData] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)
  const { push } = useHistory()
  const [idToAction, setIdToAction] = useState('')
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] = useState(
    false
  )
  const titleModalDelete = 'Excluir Categoria'
  const textModalDelete = '\nDeseja realmente excluir esse Categoria?'

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'url',
        Cell: ({ row }) => {
          const imageProduct = row.original.url
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

  async function loadCategories() {
    const { data } = await api.get('categories')
    setData(data)
    setModalLoadingIsOpen(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  function handleNewCategory() {
    push('/categoria/criar')
  }

  function handleModalConfirmDelete(row) {
    setIdToAction(row.id)
    setModalConfirmDeleteIsOpen(true)
  }

  const handleModalConfirmDeleteYes = async () => {
    setModalLoadingIsOpen(true)
    await toast
      .promise(api.delete(`/categories/${idToAction}`), {
        success: 'Categorias deletada com sucesso',
        error: 'Falha ao deletar Categorias',
      })
      .then(() => {
        setModalLoadingIsOpen(false)
        setTimeout(() => {
          setIdToAction('')
          setModalConfirmDeleteIsOpen(false)
          loadCategories()
        }, 2000)
      })
      .catch(() => {
        setModalLoadingIsOpen(false)
      })
  }

  return (
    <>
      <Molecules.LoadingModal loading={modalLoadingIsOpen} />
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
      <Molecules.Table
        data={data}
        columns={columns}
        title={'Categorias'}
        subTitle={'Listagem de Categorias'}
        extraButton={
          <S.ButtonCreate onClick={() => handleNewCategory()}>
            <p>Cadastrar nova Categoria</p>
          </S.ButtonCreate>
        }
      />
    </>
  )
}

export default ListCategories
