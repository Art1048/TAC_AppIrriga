import React, { useEffect, useState, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../../App';

function AreaList() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const session = await user.getSignInUserSession();
        const token = session.getIdToken().getJwtToken();
        const res = await fetch(process.env.REACT_APP_API_JAVA_URL + '/areas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Erro ao buscar áreas');
        const data = await res.json();
        setAreas(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchAreas();
  }, [user]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />;
  if (error) return <Alert severity="error">Erro: {error.message}</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Áreas</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {areas.map(area => (
              <TableRow key={area.id}>
                <TableCell>{area.id}</TableCell>
                <TableCell>{area.nome}</TableCell>
                <TableCell>{area.descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AreaList; 