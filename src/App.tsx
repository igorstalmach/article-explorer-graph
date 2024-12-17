import { GraphView } from "./components/Graph/GraphView.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { SearchView } from "./components/Search/SearchView.tsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/graph" element={<GraphView />} />
      </Routes>
    </BrowserRouter>
  );
};
