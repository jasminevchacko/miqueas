import { withRouter } from 'next/router'


const ActiveLink = ({ children, router, href }) => {
  const style = {
    'minWidth': '100%'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)