import { GraphView } from "./components/Graph/GraphView.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { SearchView } from "./components/Search/SearchView.tsx";
import { useState } from "react";
import { ArticleResponse, RequestParams } from "./types";
import { ApiService } from "./services/service.tsx";

export const App = () => {
  const [articles, setArticles] = useState<ArticleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (params: RequestParams | null) => {
    if (params !== null) {
      fetchData(params);
    }
  };

  const fetchData = async (params: RequestParams) => {
    try {
      console.log("fetching data...");
      const data = await ApiService.fetchPosts(params);
      setArticles(data);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  return (
    <>
      <SearchView handleSearch={handleSearch} isActive={!articles} />
      
      {articles ? (
        <GraphView articleData={articles} />
      ) : (
        <div>{error ? error : ""}</div>
      )}
    </>
  );
};