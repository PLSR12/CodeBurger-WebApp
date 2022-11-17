import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import api from '../../../services/api'
import * as Molecules from '../../../components/Molecules'
import * as Atoms from '../../../components/Atoms'
import * as S from './styles'

function NewCategorie() {
  const [file, setFile] = useState([])
  const [modalLoadingIsOpen, setModalLoadingIsOpen] = useState(false)
  const { push } = useHistory()

  const onSubmit = async (data) => {
    const categoryDataFormData = new FormData()

    categoryDataFormData.append('name', data.name)
    categoryDataFormData.append('file', file[0])

    setModalLoadingIsOpen(true)
    await toast
      .promise(api.post('categories', categoryDataFormData), {
        success: 'Categoria criada com sucesso',
        error: 'Falha ao criar a categoria',
      })
      .then(() => {
        setModalLoadingIsOpen(false)
        setTimeout(() => {
          push('/categoria/listar')
        }, 2000)
      })
      .catch(() => {
        setModalLoadingIsOpen(false)
      })
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
        <Molecules.LoadingModal loading={modalLoadingIsOpen} />
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
            <S.ButtonStyle type="submit"> Cadastrar Categoria </S.ButtonStyle>
          </div>
        </form>
      </Atoms.Box>
    </S.Container>
  )
}

export default NewCategorie
