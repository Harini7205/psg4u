import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmPassword from './components/ConfirmPassword.jsx';
import { Main } from './components/Main.jsx';
import Events from './components/Events';
import RaiseQuery from "./components/RaiseQuery";
import { MorningMenu } from './components/MorningMenu.jsx';
import { AfternoonMenu } from './components/AfternoonMenu.jsx';
import { LostandFound } from './components/LostandFound.jsx';
import TrackStatus from "./components/TrackStatus";
import SuggestForm from "./components/SuggestForm";
import Reward from "./components/Reward";
import BookClassroom from './components/BookClassroom.jsx';
import BookClassroomTrackStatus from './components/BookClassroomTrackStatus';
import { CalculateGPA } from './components/CalculateGPA.jsx';
import LevelUpLink from './components/LevelUpLink';
import EventUpdates from './components/EventUpdates';
import { Button } from './components/Button.jsx';
import Register from './components/Register.jsx';
import BuildStrategy from './components/BuildStrategy.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/forgotpassword" element={<ForgotPassword />} />
          <Route path="/confirmpassword" element={<ConfirmPassword />} />
          <Route path="/main" element={<Main />} />
          <Route path="/events" element={<Events />} />
          <Route path="/raisequery" element={<RaiseQuery />} />
          <Route path="/morningmenu" element={<MorningMenu />} />
          <Route path="/afternoonmenu" element={<AfternoonMenu />}/>
          <Route path="/lostandfound" element={<LostandFound />} />
          <Route path="/trackstatus" element={<TrackStatus />} />
          <Route path="/leveluplink" element={<LevelUpLink />} />
          <Route path="/suggest" element={<SuggestForm />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/bookclassroom" element={<BookClassroom />} />
          <Route path="/bookclassroomtrackstatus" element={<BookClassroomTrackStatus />} />
          <Route path="/calculategpa" element={<CalculateGPA />} />
          <Route path="/eventupdates" element={<EventUpdates />} />
          <Route path="/button" element={<Button />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buildstrategy" element={<BuildStrategy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
