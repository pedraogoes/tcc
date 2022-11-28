import { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Link as ComponentLink,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useNotify } from '../../hooks/Notification';
import { useHref } from 'react-router-dom'

const theme = createTheme();

export function SignUp() {
  const [value, setValue] = useState<string>('');
  const { notification } = useNotify();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await api.post('/user', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        password_confirmation: data.get('password_confirmation'),
        type: data.get('type')
      });

      notification({
          message: 'Cadastro realizado com sucesso',
          type: 'success'
      });

      useHref('/');
    } catch (error: any) {
      notification({
          message: error.response.data.message,
          type: 'error'
      });
    }    
    
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar conta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirmar senha"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <FormLabel id="type_user">Tipo</FormLabel>
                  <RadioGroup
                      aria-labelledby="type_user"
                      name="type"
                      value={value}
                      onChange={handleChange}
                      row
                    >
                    <FormControlLabel value="T" control={<Radio />} label="Transportador" />
                    <FormControlLabel value="E" control={<Radio />} label="Embarcador" />
                  </RadioGroup>
              </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to={'/'}>
                  <ComponentLink variant="body2">
                    Voltar para login
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