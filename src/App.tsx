import { Spin, message } from "antd";
import { useState } from "react";

import { GraphView } from "./components/Graph";
import { SearchView } from "./components/Search";
import { ApiService } from "./services";
import {  ArticleResponse, RequestParams, SimilarArticle } from "./types";
import { NodeObject } from "react-force-graph-2d";
import { parseArticleString } from "./utils";

export const App = () => {
  const [articles, setArticles] = useState<ArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [querySize, setQuerySize] = useState(5)

  const querySizeCallback = (size: number) => {
    setQuerySize(size)
  }

  const fetchData = async (params: RequestParams | null) => {
    if (params === null) {
      return;
    }
  
    try {
      setIsLoading(true);
  
      const data = await ApiService.fetchPosts(params);
      console.log("Articles before processing:", data.similar_articles);
      const updatedArticles = await Promise.all(
        data.similar_articles.map(async (article) => {
          const ids = article.ids;
          const articleId = ids
            ? ids.arxiv_id !== ''
              ? ids.arxiv_id
              : ids.doi !== ''
              ? ids.doi
              : ids.scopus_id !== ''
              ? ids.scopus_id
              : null
            : null;
          console.log(articleId)
  
          if (articleId !== null && articleId !== undefined) {
            const params = parseArticleString(articleId, querySize);
            console.log(params)
  
            if (params !== null) {
              const subArticleData = await getData(params);
              // Return a new article object with updated subArticles
              return { ...article, subArticles: subArticleData };
            }
          }
  
          // Return the original article if no updates
          return article;
        })
      );
  
      // Update the entire state to trigger re-render
      setArticles({ ...data, similar_articles: updatedArticles });
  
      setIsLoading(false);
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch posts. Please try again later.",
      });
      setIsLoading(false);
    }
  };
  
  const getData = async (params: RequestParams): Promise<ArticleResponse> => {
    const data = await ApiService.fetchPosts(params);
    return data;
  };
  
  
  

  function getNestedArticle(articles: ArticleResponse | undefined, path: string): SimilarArticle | undefined {
    // If no articles or empty path, return undefined
    if (!articles || !path) {
      return undefined;
    }
  
    // Split the path into individual IDs and convert to numbers
    const ids = path.split('-').map(Number);
    
    let currentLevel: ArticleResponse | undefined = articles;
    let result: SimilarArticle | undefined;
  
    // Traverse through each level
    for (const id of ids) {
      if (!currentLevel?.similar_articles?.[id-1]) {
        return undefined;
      }
  
      result = currentLevel.similar_articles[id-1];
      currentLevel = result.subArticles;
    }
  
    return result;
  }
  
  const handleGraphClick = async (node: NodeObject) => {
    if (articles !== null && node !== undefined && node.id !== undefined) {
  
      let simArticle: SimilarArticle | undefined;
  
      if (typeof node.id === 'string') {
        simArticle = getNestedArticle(articles, node.id)

      } else {
        simArticle = articles?.similar_articles[Number(node.id) - 1];
      }
  
      if (simArticle !== undefined && simArticle.subArticles === undefined) {
        const ids = simArticle.ids;
        const articleId = ids
          ? ids.arxiv_id !== ''
            ? ids.arxiv_id
            : ids.doi !== ''
            ? ids.doi
            : ids.scopus_id !== ''
            ? ids.scopus_id
            : null
          : null;
  

        if (articleId !== null && articleId !== undefined) {

          const params = parseArticleString(articleId, querySize);

          if (params !== null) {

            setIsLoading(true);
            const data = await ApiService.fetchPosts(params);
            setIsLoading(false);
            simArticle.subArticles = data;
          }
        }
      }
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
        <SearchView handleSearch={fetchData} isActive={!articles} querySizeCallback={querySizeCallback} />
        <Spin spinning={isLoading} fullscreen={true} size="large" />
        {articles && <GraphView articleData={articles} handleGraphClick={handleGraphClick} />}
      </div>
    </>
  );
};
