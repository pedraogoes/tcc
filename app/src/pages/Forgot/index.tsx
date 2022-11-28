import React from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Link as ComponentLink,
    Box,
    Typography,
    Container
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNotify } from '../../hooks/Notification';

const theme = createTheme();

export function Forgot() {
    const { notification } = useNotify();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email')
    });

    notification({
        message: 'Solicitação enviada com sucesso!',
        type: 'success'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Recuperar Senha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Informe seu email cadastrado"
              name="email"
              autoComplete="email"             
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/'}>
                    <ComponentLink href="/" variant="body2">
                      Voltar para Login
                    </ComponentLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}