import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './app/page'
import ProjectsPage from './app/projects'
import ProjectDetail from '@/app/ProjectDetail'

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />

      </Routes>
    </Router>
  )
}

export default App
