import { yupResolver } from '@hookform/resolvers/yup'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import * as Atoms from '../../components/Atoms'
import { useUser } from '../../hooks/UserContext'

import ImgLoading from '../../assets/img/loading.gif'
import GenericModal from '../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../components/Molecules/Modal/styles'
import Row from './row'

import api from '../../services/api'
import formatDate from '../../utils/formatDate'
import * as S from './styles'

export function User() {
  const { userData } = useUser()
  const [orders, setOrders] = useState([])
  const [rows, setRows] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)

  const schema = Yup.object().shape({
    name: Yup.string().required('O name é obrigatório'),
    price: Yup.string().required('O preço é obrigátoria'),
    category: Yup.object().required('Escolha uma categoria'),
    file: Yup.mixed().test('required', 'Carregue uma imagem', (value) => {
      return value && value.length > 0
    }),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('orders')

      function filterOrders(data) {
        return data.user.id === userData.id
      }

      const filteredOrdersPerUser = data.filter(filterOrders)

      setOrders(filteredOrdersPerUser)
      setModalLoadingIsOpen(false)
    }
    loadOrders()
  }, [userData])

  function createData(order) {
    return {
      name: order.user.name,
      address: order.user.address,
      complement: order.user.complement,
      contact: order.user.contact,
      orderId: order._id,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products,
    }
  }

  useEffect(() => {
    const newRows = orders.map((ord) => createData(ord))
    setRows(newRows)
  }, [orders])

  return (
    <S.Container>
      <GenericModal isOpen={modalLoadingIsOpen}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>

      <Atoms.Box>
        <Atoms.TitlePage> Dados do Usuário </Atoms.TitlePage>
        <Atoms.InputComponent
          disabled
          type="text"
          label="Nome"
          style={{ marginBottom: '10px' }}
          placeholder="Digite o Nome:"
          defaultValue={userData.name}
        />

        <Atoms.InputComponent
          disabled
          type="email"
          label="Email"
          placeholder="Digite o Email:"
          defaultValue={userData.email}
        />
        <Atoms.InputComponent
          disabled
          label="Contato"
          placeholder="Digite o Contato:"
          defaultValue={userData.contact}
        />
        <Atoms.InputComponent
          disabled
          type="text"
          label="Endereço"
          placeholder="Digite o Endereço:"
          defaultValue={userData.address}
        />
        <Atoms.InputComponent
          disabled
          type="text"
          label="Complemento"
          placeholder="Digite o Complemento:"
          defaultValue={userData.complement}
        />

        <S.BoxArea>
          <Atoms.TitlePage> Pedidos do Usuário </Atoms.TitlePage>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell> Pedido</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Data do Pedido</TableCell>
                  <TableCell> Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row
                    key={row.orderId}
                    row={row}
                    setOrders={setOrders}
                    orders={orders}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S.BoxArea>
      </Atoms.Box>
    </S.Container>
  )
}
