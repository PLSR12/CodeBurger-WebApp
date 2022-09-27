import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../services/api'

import * as Atoms from '../../../components/Atoms'

import * as S from './styles'

function NewCategorie() {
  const [file, setFile] = useState([])
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const brandDataFormData = new FormData()

    brandDataFormData.append('name', data.name)
    brandDataFormData.append('file', file[0])

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
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const handleDrop = (acceptedFiles) =>
    setFile(acceptedFiles.map((file) => file))

  return (
    <S.Container>
      <Atoms.Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Atoms.InputComponent
              type="text"
              label="Nome"
              {...register('name')}
              error={errors.name}
              placeholder="Digite o Nome:"
            />
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input
                    type="file"
                    accept="image/*"
                    {...register('file')}
                    {...getInputProps()}
                  />
                  {file.length > 0 ? (
                    <p>
                      {file.map((file) => (
                        <li key={file}>{file?.name}</li>
                      ))}
                    </p>
                  ) : (
                    <p> Arraste sua imagem ou clique e selecione:</p>
                  )}
                </div>
              )}
            </Dropzone>
            {Object.keys(file).length <= 0 && (
              <Atoms.ErrorMessage> Carregue uma Imagem!</Atoms.ErrorMessage>
            )}
            <S.ButtonStyle type="submit"> Adicionar Categoria </S.ButtonStyle>
          </div>
        </form>
      </Atoms.Box>
    </S.Container>
  )
}

export default NewCategorie
