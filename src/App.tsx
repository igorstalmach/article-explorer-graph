import { GraphView } from "./components/Graph/GraphView.tsx";
import { SearchView } from "./components/Search/SearchView.tsx";
import { useState } from "react";
import { ArticleResponse, RequestParams } from "./types";
import { ApiService } from "./services/service.tsx";
import { Spin } from "antd";

export const App = () => {
  const [articles, setArticles] = useState<ArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (params: RequestParams | null) => {
    if (params !== null) {
      fetchData(params);
    }
  };

  const fetchData = async (params: RequestParams) => {
    try {
      setIsLoading(true)
      console.log("fetching data...");
      const data = await ApiService.fetchPosts(params);
      setArticles(data);
      setIsLoading(false)
      console.log(data);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      setIsLoading(false)
    }
  };

  return (

    <div
    style={!articles ? {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      
    }: {}}>

      <SearchView handleSearch={handleSearch} isActive={!articles} />
      <Spin spinning={isLoading} fullscreen={true} size="large"/>

      {articles ? (
        <GraphView articleData={articles} />
      ) : (
        <div>{error ? error : ""}</div>
      )}

    </div>

  );
};