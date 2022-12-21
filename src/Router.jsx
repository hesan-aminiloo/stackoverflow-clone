
import React, { lazy, Suspense } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';


// Layouts
import GeneralLayout from './Layouts/General';

// Pages
const Home = lazy(() => import('./pages/Home'));
const QuestionDetails = lazy(() => import('./pages/QuestionDetails'));
const Search = lazy(() => import('./pages/Search'));
const Ask = lazy(() => import('./pages/Ask'));


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route path='/' element={<Home />} />
          <Route path='/questions/:id' element={<QuestionDetails />} />
          <Route path='/search' element={<Search />} />
          <Route path='/ask' element={<Ask />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
};

const Wrapper = () => (
  <GeneralLayout>
    <Suspense>
      <Outlet />
    </Suspense>
  </GeneralLayout>
)

export default Router;