import React, { Suspense } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/Layout';
import { AppRoute } from '../../../const';
import { Loader } from '@consta/uikit/Loader';
import { Responses404 } from '@consta/uikit/Responses404';

const MainPage = React.lazy(() => import('../../pages/MainPage'));
const ServicePage = React.lazy(() => import('../../pages/ServicePage'));
const AuthPage = React.lazy(() => import('../../pages/Auth'));
const ProfilePage = React.lazy(() => import('../../pages/ProfilePage'));
const ServiceDetailPage = React.lazy(() => import('../../pages/ServiceDetailPage'));

const App = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <Router>
        <Suspense
          fallback={
            <div style={{ width: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Loader size="m" />
            </div>
          }
        >
          <Routes>
            <Route path={AppRoute.main} element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path={AppRoute.service} element={<ServicePage />} />
              <Route path={AppRoute.auth} element={<AuthPage />} />
              <Route path={AppRoute.profile} element={<ProfilePage />} />
              <Route path='/service/:id' element={<ServiceDetailPage />} />
            </Route>
            <Route path='*' element={
              <div style={{ width: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Responses404 />
              </div>
            } />
          </Routes>
        </Suspense>
      </Router>
    </Theme>
  );
}

export default App;
