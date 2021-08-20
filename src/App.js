import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home'
import Civilization from './components/Civilization'
import Navbar from './components/Navbar'
import {createMuiTheme} from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#000000"
    },
    primary: {
      main: red[900]
    },
    text: {
      primary: "#FFFFFF"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          <Route path="/:id">
            <Civilization />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
