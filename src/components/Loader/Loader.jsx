import LoaderStyles from './loader.module.css'

function Loader() {
  return (
    <div className={LoaderStyles['lds-default']}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loader
