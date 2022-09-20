import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import * as Atoms from '../../../components/Atoms'

import * as S from './styles'

function NewCategorie() {
  const [fileName, setFileName] = useState(null)
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const brandDataFormData = new FormData()

    brandDataFormData.append('name', data.name)
    brandDataFormData.append('file', data.file[0])

    await toast.promise(api.post('categories', brandDataFormData), {
      success: 'Categoria criada com sucesso',
      error: 'Falha ao criar a categoria',
    })

    setTimeout(() => {
      push('/pedidos')
    }, 2000)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    file: Yup.mixed().test('required', 'Carregue uma imagem', (value) => {
      return value && value.length > 0
    }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <S.Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.Label>Nome:</S.Label>
          <S.Input type="text" {...register('name')} />
          <Atoms.ErrorMessage>{errors.name?.message}</Atoms.ErrorMessage>
          <div>
            <S.LabelUpload>
              {fileName || (
                <>
                  <CloudUploadIcon />
                  Caregue a imagem do marca
                </>
              )}
              <input
                type="file"
                {...register('file')}
                onChange={(value) => {
                  setFileName(value.target.files[0]?.name)
                }}
              />
            </S.LabelUpload>
            <Atoms.ErrorMessage>{errors.file?.message}</Atoms.ErrorMessage>
          </div>

          <S.ButtonStyle type="submit"> Adicionar Categoria </S.ButtonStyle>
        </div>
      </form>
    </S.Container>
  )
}

export default NewCategorie
