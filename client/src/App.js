import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

import clienteAxios from './config/axios'

function App() {
  // State
  const [citas, setCitas] = useState([]);
  const [consultar, setConsultar] = useState(true);

  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {
        clienteAxios.get('/pacientes')
          .then(resp => {
            setCitas(resp.data.pacientes);
            setConsultar(false);
          })
          .catch(console.error);
      };
  
      consultarAPI();
    }
  }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route 
          exact 
          path="/"
          component={() => <Pacientes citas={citas} />} 
        />
        <Route 
          exact 
          path="/nueva"
          component={() => <NuevaCita setConsultar={setConsultar} />}
        />
        <Route 
          exact 
          path="/cita/:id"
          render={(props) => {
            const cita = citas.filter(c => c._id === props.match.params.id);
            return(
              <Cita 
                cita={cita} 
                setConsultar={setConsultar} 
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
