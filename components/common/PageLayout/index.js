import Navigation from '@components/common/Navigation'

const PageLayout = ({ children, navigation, site, theme, adminToolbarVisible }) => {
  return (
    <>
      <Navigation {...navigation} adminToolbarVisible={adminToolbarVisible} />
      <div className="container">{children}</div>
    </>
  )
}

export default PageLayout
