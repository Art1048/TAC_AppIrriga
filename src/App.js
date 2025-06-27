import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, Avatar, Menu, MenuItem } from '@mui/material';
import AreaList from './components/Area/AreaList';
import AreaForm from './components/Area/AreaForm';
import NdviMapList from './components/NdviMap/NdviMapList';
import NdviMapForm from './components/NdviMap/NdviMapForm';
import ReservatorioList from './components/Reservatorio/ReservatorioList';
import ReservatorioForm from './components/Reservatorio/ReservatorioForm';
import IrrigadorList from './components/Irrigador/IrrigadorList';
import IrrigadorForm from './components/Irrigador/IrrigadorForm';
import PessoaList from './components/Pessoa/PessoaList';
import PessoaForm from './components/Pessoa/PessoaForm';
import { Auth } from 'aws-amplify';
import Login from './components/Auth/Login';

const navLinks = [
  { to: '/areas', label: 'Áreas' },
  { to: '/areas/novo', label: 'Cadastrar Área' },
  { to: '/reservatorios', label: 'Reservatórios' },
  { to: '/reservatorios/novo', label: 'Cadastrar Reservatório' },
  { to: '/irrigadores', label: 'Irrigadores' },
  { to: '/irrigadores/novo', label: 'Cadastrar Irrigador' },
  { to: '/pessoas', label: 'Pessoas' },
  { to: '/pessoas/novo', label: 'Cadastrar Pessoa' },
  { to: '/ndvi-maps', label: 'NDVI Maps' },
  { to: '/ndvi-maps/novo', label: 'Cadastrar NDVI Map' },
];

export const AuthContext = React.createContext();

function NavBar({ user, onLogout }) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard Irrigação
        </Typography>
        {navLinks.map(link => (
          <Button
            key={link.to}
            color={location.pathname === link.to ? 'secondary' : 'inherit'}
            component={Link}
            to={link.to}
            sx={{ ml: 1 }}
          >
            {link.label}
          </Button>
        ))}
        {user && (
          <>
            <Button color="inherit" onClick={handleMenu} sx={{ ml: 2 }}>
              <Avatar sx={{ width: 28, height: 28, mr: 1 }}>
                {user?.attributes?.email?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || '?'}
              </Avatar>
              {user?.attributes?.email || user?.username}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { handleClose(); onLogout(); }}>Sair</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await Auth.signOut();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div style={{textAlign: 'center', marginTop: 40}}>Carregando autenticação...</div>;
  if (!user) return <Login onLogin={() => window.location.reload()} />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user, logout }) => user && <NavBar user={user} onLogout={logout} />}
        </AuthContext.Consumer>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <PrivateRoute>
            <Routes>
              <Route path="/areas" element={<AreaList />} />
              <Route path="/areas/novo" element={<AreaForm />} />
              <Route path="/reservatorios" element={<ReservatorioList />} />
              <Route path="/reservatorios/novo" element={<ReservatorioForm />} />
              <Route path="/irrigadores" element={<IrrigadorList />} />
              <Route path="/irrigadores/novo" element={<IrrigadorForm />} />
              <Route path="/pessoas" element={<PessoaList />} />
              <Route path="/pessoas/novo" element={<PessoaForm />} />
              <Route path="/ndvi-maps" element={<NdviMapList />} />
              <Route path="/ndvi-maps/novo" element={<NdviMapForm />} />
            </Routes>
          </PrivateRoute>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
