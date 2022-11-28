import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link as ComponentLink,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/Authenticate';
import { useNotify } from '../../hooks/Notification';

const theme = createTheme();

export function SignIn() {
  const { signIn } = useAuth();
  const { notification } = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('email') === null || data.get('password') === null) {
      throw Error('Usuário ou senha em branco, favor preencher')
    }

    try {
      await signIn({
        email: data.get('email')?.toString() as string,
        password: data.get('password')?.toString() as string
      })
  
      navigate('/home');
  
    } catch (error: any) {
      notification({
        message: error.response.data.message,
        type: 'error'
      })
    }

    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Acessar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/forgot'}>
                  <ComponentLink variant="body2">
                    Esqueceu a senha?
                  </ComponentLink>
                </Link>
              </Grid>              
            </Grid>
            <Grid container>
              <Grid item>
              <Typography component="p" variant="inherit">             
                  Ainda não é cadastrado?
                  <Link to={'/signup'}>
                    <ComponentLink variant="body2">
                       Criar conta
                    </ComponentLink>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}