import React, { useEffect, useState, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../../App';

function ReservatorioList() {
  const [reservatorios, setReservatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchReservatorios() {
      try {
        const session = await user.getSignInUserSession();
        const token = session.getIdToken().getJwtToken();
        const res = await fetch(process.env.REACT_APP_API_JAVA_URL + '/reservatorios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Erro ao buscar reservatórios');
        const data = await res.json();
        setReservatorios(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchReservatorios();
  }, [user]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">Erro: {error.message}</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Reservatórios</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Capacidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservatorios.map(res => (
              <TableRow key={res.id}>
                <TableCell>{res.id}</TableCell>
                <TableCell>{res.nome}</TableCell>
                <TableCell>{res.capacidade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ReservatorioList; 