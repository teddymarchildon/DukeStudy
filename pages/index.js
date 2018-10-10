import Link from 'next/link'
import { withRouter } from 'next/router'


const HomePage = withRouter((props) => (
  <div>
    <div>
      <h1> Welcome to DukeStudy, {props.router.query.netid}</h1>
    </div>

    <div>
      <Link href="/login">
        <a>Logout</a>
        </Link>
    </div>
  </div>
))


export default HomePage
