import ReactModal from 'react-modal'

function GenericModal({ children, isOpen, onRequestClose, ariaHideApp }) {
  return (
    <ReactModal
      style={{
        overlay: {},
        content: { inset: '30%', minHeight: 'min-content', height: '200px' },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
    >
      {children}
    </ReactModal>
  )
}

export default GenericModal
