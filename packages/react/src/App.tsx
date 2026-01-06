import { getGreeting } from '@template/template'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'blue',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '50px',
  },
  reactText: {
    color: 'red',
    fontWeight: 'lighter',
  },
})

export const App = () => {
  return (
    <div {...stylex.props(styles.container)}>
      {getGreeting()}
      <span {...stylex.props(styles.reactText)}> --react</span>
    </div>
  )
}
