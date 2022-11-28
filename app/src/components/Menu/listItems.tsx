import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material';
import {
  Dashboard,
  GridView,
  People,
  LocalShipping,
  AccountCircle,
  Store,
  PermIdentity,
  Description
} from '@mui/icons-material';
import { useAuth } from '../../hooks/Authenticate';

export const mainListItems = (navigate: Function) => {
  const { user } = useAuth();

  const navigatePages = (page: string) => {
    navigate(page);
  }

  return (
    <>
      <ListItemButton onClick={() => navigatePages('home')}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
        {
          (user.type !== 'T') &&
          <>
            <ListItemButton onClick={() => navigatePages('invoice')}>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Notas Fiscais" />
            </ListItemButton>
          </>
        }
      
        {
          (user.type !== 'E') &&

          <>
            <ListItemButton onClick={() => navigatePages('charge')}>
              <ListItemIcon>
                <GridView />
              </ListItemIcon>
              <ListItemText primary="Cargas" />
            </ListItemButton>
            <ListItemButton onClick={() => navigatePages('truck')}>
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Veículos" />
            </ListItemButton>

            <ListItemButton onClick={() => navigatePages('driver')}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Motoristas" />
            </ListItemButton>
          </>      
        }

        
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Configurações
      </ListSubheader>
      <ListItemButton onClick={() => navigatePages('business')}>
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary="Empresa" />
      </ListItemButton>
      <ListItemButton onClick={() => navigatePages('user')}>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>
      <ListItemButton onClick={() => navigatePages('profile')}>
        <ListItemIcon>
          <PermIdentity />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItemButton>
    </>
  )
};