import Link from 'next/link'
import { withRouter } from 'next/router'

const HomePage = withRouter((props) => (
  <div>
    <div>
      <h1> Welcome to DukeStudy, {props.router.query.netid}</h1>
      <Link href="/tictactoe">
        <a>Click Here to play Tic Tac Toe</a>
        </Link>
    </div>

    <div>
      <Link href="/login">
        <a>Login</a>
        </Link>
    </div>
  </div>
)
)

export default HomePage
