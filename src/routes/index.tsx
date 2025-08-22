import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Events from '../features/events/pages/Events';
import EventDetails from '../features/events/pages/EventDetails';
import HallOfFame from '../features/hallOfFame/pages/HallOfFame';



export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/events" element={<Events />} />

        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
      </Routes>
    </Router>
  );
}