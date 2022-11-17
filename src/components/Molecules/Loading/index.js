import ImgLoading from '../../../assets/img/loading-novo.gif'
import GenericModal from '../../../components/Molecules/Modal/GenericModal'
import { ModalContentLoading } from '../../../components/Molecules/Modal/styles'

export function LoadingModal({ loading }) {
  return (
    <>
      <GenericModal isOpen={loading}>
        <ModalContentLoading>
          <h2>Carregando...</h2>
          <img src={ImgLoading} alt="Loading" />
        </ModalContentLoading>
      </GenericModal>
    </>
  )
}
