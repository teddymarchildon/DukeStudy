import Link from 'next/link'

export default () => (
  <div>
  <div>
    <h1> Welcome to DukeStudy</h1>
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
