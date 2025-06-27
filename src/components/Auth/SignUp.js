import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Button, Paper, Typography, Snackbar, Alert, Box } from '@mui/material';

function SignUp({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signup'); // 'signup' | 'confirm'
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({ type: 'success', message: '' });
  const [name, setName] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFeedback({ type: 'success', message: '' });
    setOpen(false);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, name },
      });
      setStep('confirm');
      setFeedback({ type: 'success', message: 'Cadastro realizado! Verifique seu e-mail para o código de confirmação.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setOpen(true);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setFeedback({ type: 'success', message: '' });
    setOpen(false);
    try {
      await Auth.confirmSignUp(email, code);
      setFeedback({ type: 'success', message: 'Usuário confirmado! Agora você pode fazer login.' });
      setStep('done');
      if (onSuccess) onSuccess();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setOpen(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f6f8fa">
      <Paper sx={{ p: 4, minWidth: 320 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Criar Conta</Typography>
        {step === 'signup' && (
          <form onSubmit={handleSignUp}>
            <TextField
              label="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Cadastrar</Button>
            <Button variant="text" color="secondary" fullWidth sx={{ mt: 1 }} onClick={onSuccess}>Voltar para Login</Button>
          </form>
        )}
        {step === 'confirm' && (
          <form onSubmit={handleConfirm}>
            <TextField
              label="Código de Confirmação"
              value={code}
              onChange={e => setCode(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Confirmar</Button>
          </form>
        )}
        {step === 'done' && (
          <Typography sx={{ mt: 2 }}>Cadastro confirmado! Agora você pode fazer login.</Typography>
        )}
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={feedback.type} sx={{ width: '100%' }}>
            {feedback.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default SignUp; 