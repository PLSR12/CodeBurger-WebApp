import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import api from '../../../services/api'
import * as Molecules from '../../../components/Molecules'
import formatDate from '../../../utils/formatDate'
import status from './order-status'
import Row from './row'
import * as S from './styles'

function Orders() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [activeStatus, setActiveStatus] = useState(1)
  const [rows, setRows] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(true)

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('orders')

      setOrders(data)
      setFilteredOrders(data)
      setModalLoadingIsOpen(false)
    }
    loadOrders()
  }, [])

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
    const newRows = filteredOrders.map((ord) => createData(ord))
    setRows(newRows)
  }, [filteredOrders])

  useEffect(() => {
    if (activeStatus === 1) {
      setFilteredOrders(orders)
    } else {
      const statusIndex = status.findIndex((sts) => sts.id === activeStatus)
      const newFilteredOrders = orders.filter(
        (order) => order.status === status[statusIndex].value
      )
      setFilteredOrders(newFilteredOrders)
    }
  }, [orders, activeStatus])

  function handleStatus(status) {
    if (status.id === 1) {
      setFilteredOrders(orders)
    } else {
      const newOrders = orders.filter((order) => order.status === status.value)

      setFilteredOrders(newOrders)
    }
    setActiveStatus(status.id)
  }

  return (
    <S.Container>
      <Molecules.LoadingModal loading={modalLoadingIsOpen} />
      <S.Menu>
        {status &&
          status.map((status) => (
            <S.LinkMenu
              key={status.id}
              onClick={() => handleStatus(status)}
              isActiveStatus={activeStatus === status.id}
            >
              {status.label}
            </S.LinkMenu>
          ))}
      </S.Menu>
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
    </S.Container>
  )
}

export default Orders
