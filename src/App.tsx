import { NotesPage } from "./pages/NotesPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoteDetail } from "./pages/NoteDetail.tsx";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
