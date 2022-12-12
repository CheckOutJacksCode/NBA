import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import DeepStats from './pages/deepStats';
import ShotCharts from './pages/shotCharts';
import Jackarithm from './pages/jack-o-rithm';
import Layout from './pages/Layout';

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="deepStats" element={<DeepStats />} />
          <Route path="shotCharts" element={<ShotCharts />} />
          <Route path="jackarithm" element={<Jackarithm />} />
        </Route>
      </Routes>
    </BrowserRouter>
)};

export default App;