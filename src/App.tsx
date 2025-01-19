import { Spin, message } from "antd";
import { useState } from "react";

import { GraphView } from "./components/Graph";
import { SearchView } from "./components/Search";
import { ApiService } from "./services";
import { ArticleResponse, RequestParams } from "./types";

export const App = () => {
  const [articles, setArticles] = useState<ArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (params: RequestParams | null) => {
    if (params === null) {
      return;
    }

    try {
      setIsLoading(true);
      const data = await ApiService.fetchPosts(params);
      setArticles(data);
      setIsLoading(false);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch posts. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={
          !articles
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }
            : {}
        }
      >
        <SearchView handleSearch={fetchData} isActive={!articles} />
        <Spin spinning={isLoading} fullscreen={true} size="large" />
        {articles && <GraphView articleData={articles} />}
      </div>
    </>
  );
};
