const PageLayout = ({ children }) => {
  return <div>{children}</div>
}

export const getStaticProps = async function (props) {
  console.log({ props })

  return {
    props: {},
  }
}

export default PageLayout
