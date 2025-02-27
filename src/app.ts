import { Component } from 'react'

import type { PropsWithChildren } from 'react'

import './app.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return this.props.children
  }
}


export default App
