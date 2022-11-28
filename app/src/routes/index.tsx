import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { SignIn }  from '../pages/SignIn';
import { Forgot } from '../pages/Forgot';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { Truck } from '../pages/Truck';
import { Driver } from '../pages/Driver';
import { Invoice } from '../pages/Invoice';
import { Charge } from '../pages/Charge';
import { User } from '../pages/User';
import { Profile } from '../pages/Profile';
import { Business } from '../pages/Business';

export const AppRoutes: React.FC = () => {
    return (
        <>
            <Routes>

                <Route element={<PrivateRoute />} >                
                    <Route path='/home' element={<Home />} />
                    <Route path='/truck' element={<Truck />} />
                    <Route path='/driver' element={<Driver />} />
                    <Route path='/invoice' element={<Invoice />} />
                    <Route path='/charge' element={<Charge />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/business' element={<Business />} />
                </Route>                         
                <Route path='/' element={<SignIn />} />
                <Route path='/forgot' element={<Forgot />} />
                <Route path='/signup' element={<SignUp />} />

            </Routes>
        </>
    )
}