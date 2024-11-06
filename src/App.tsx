import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import NotePage from "./pages/NotePage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/new" element={<NotePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
