import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import State from "./components/state/State";
import Admin from "./components/admin/Admin";
import AdminIn from "./components/AadminPanel/AdminIn";
import Register from "./components/UserRegistration/Register";
import Requisitos from "./components/requirements/Requisitos";
import LoginProfesor from "./components/professor/LoginProfesor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequisitosAdmin from "./components/RequirementsAdmin/RequisitosAdmin";
import PostulanteDetails from "./components/ApplicantDetails/PostulanteDetails";
import RegistarProfesor from "./components/ProfessorRegistration/RegistrarProfesor";
import PostulanteProfesor from "./components/ApplicantDetailsForProfessor/PostulanteProfesor";
import RutaProtegida from "./RutaProtegida";
import RutaProtegidaAdmin from "./RutaProtegidaAdmin";
import RutaProtegidaAmbos from "./RutaProtegidaAmbos";
import CambiarPassword from "./components/ChangePassword/CambiarPassword";
import ListaProfesores from "./components/ListaProfesores/ListaProfesores";
import Header from "./components/header/Header";
import ListApplications from "./components/AadminPanel/ListApplications";
import DetailApplicationProfessor from "./components/ApplicantDetailsForProfessor/DetailApplicationProfessor";
import KeepSubject from "./components/KeepSubject/KeepSubject";
function App() {
  return (
    <div>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requisitos" element={<Requisitos />} />
          <Route path="/postular" element={<Register />} />
          <Route path="/estado" element={<State />} />
          <Route path="/login" element={<Admin />} />

          <Route
            path="/cambiar-contrasena"
            element={
              <RutaProtegidaAmbos>
                <CambiarPassword />
              </RutaProtegidaAmbos>
            }
          />
          <Route path="/requisitos-admin" element={<RequisitosAdmin />} />

          <Route

            path="/admin"
            element={
              <RutaProtegidaAdmin>
                <AdminIn />
              </RutaProtegidaAdmin>
            }
          />

          <Route

            path="/admin/mantener-asignaturas"
            element={
              <RutaProtegidaAdmin>
                <KeepSubject />
              </RutaProtegidaAdmin>
            }
          />

          <Route
            path="/admin/ayudantes"
            element={
              <RutaProtegidaAdmin>
                <ListApplications />
              </RutaProtegidaAdmin>
            }
          />

          <Route
            path="/admin/lista-profesores"
            element={
              <RutaProtegidaAdmin>
                <ListaProfesores />
              </RutaProtegidaAdmin>
            }
          />

          <Route
            path="/admin/registrar-profesor"
            element={
              <RutaProtegidaAdmin>
                <RegistarProfesor />
              </RutaProtegidaAdmin>
            }
          />


          <Route
            path="/adminin/:rut"
            element={
              <RutaProtegidaAdmin>
                <PostulanteDetails />
              </RutaProtegidaAdmin>
            }
          />

          <Route path="/login-profesor" element={<LoginProfesor />} />

          <Route
            path="/profesor"
            element={
              <RutaProtegida>
                <PostulanteProfesor />
              </RutaProtegida>
            }
          />

          <Route
            path="/profesor/:rut"
            element={
              <RutaProtegida>
                <DetailApplicationProfessor />
              </RutaProtegida>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
