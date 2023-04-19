import CancelIcon from '@mui/icons-material/Cancel'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Molecules from '../../../components/Molecules'
import { TableActions } from '../../../components/Molecules/Table/TableTools'
import api from '../../../services/api'
import * as S from './styles'

function ListProducts() {
  const [data, setData] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)
  const { push } = useHistory()
  const [idToAction, setIdToAction] = useState()
  const [modalConfirmDeleteIsOpen, setModalConfirmDeleteIsOpen] = useState(
    false
  )

  const titleModalDelete = 'Excluir Produto'
  const textModalDelete = '\nDeseja realmente excluir esse Produto?'

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
        Header: 'Categoria',
        accessor: 'category',
      },
      {
        Header: 'Preço',
        accessor: 'price',
      },

      {
        Header: 'Oferta',
        accessor: 'offer',
        Cell: ({ row }) => {
          const dataOffer = row.original.offer
          return (
            <>
              {dataOffer ? (
                <CheckBoxIcon style={{ color: '#228822' }} />
              ) : (
                <CancelIcon style={{ color: '#CC1717' }} />
              )}
            </>
          )
        },
      },
      {
        Header: 'Ações',
        accessor: 'options',
        Cell: ({ row }) => {
          const data = row.original

          return (
            <TableActions>
              <MenuItem onClick={() => handleEdit(data)}>Editar</MenuItem>
              <MenuItem onClick={() => handleModalConfirmDelete(data)}>
                Excluir
              </MenuItem>
            </TableActions>
          )
        },
        disableSortBy: true,
        width: 30,
      },
    ],
    []
  )
  async function loadProducts() {
    const { data } = await api.get('products')

    const dataMapped = data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        url: product.url,
        category: product.category?.name,
        price: maskCurrency(product.price),
        offer: product.offer,
      }
    })
    setData(dataMapped)
    setModalLoadingIsOpen(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleEdit = (row) => {
    push(`/produtos/editar/:${row.id}`)
  }

  function maskCurrency(value, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value)
  }

  function handleNewProduct() {
    push('/produtos/criar')
  }

  function handleModalConfirmDelete(row) {
    setIdToAction(row.id)
    setModalConfirmDeleteIsOpen(true)
  }

  const handleModalConfirmDeleteYes = async () => {
    await toast.promise(api.delete(`/products/${idToAction}`), {
      success: 'Produto deletado com sucesso',
      error: 'Falha ao deletar Produto',
    })

    setTimeout(() => {
      setIdToAction('')
      setModalConfirmDeleteIsOpen(false)
      loadProducts()
    }, 2000)
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
        title={'Produtos'}
        subTitle={'Listagem de Produtos'}
        extraButton={
          <S.ButtonCreate onClick={() => handleNewProduct()}>
            <p>Cadastrar novo Produto</p>
          </S.ButtonCreate>
        }
      />
    </>
  )
}

export default ListProducts
