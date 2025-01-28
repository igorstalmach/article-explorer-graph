import { Switch } from "antd";
import { useState } from "react";
import { NodeObject } from "react-force-graph-2d";

import { Article, ArticleResponse, SimilarArticle } from "../../types";
import { Graph2D } from "./Graph2D.tsx";
import { Graph3D } from "./Graph3D.tsx";
import { ArticleInfo } from "./components/ArticleInfo";
import { ArticleList } from "./components/ArticleList";

type GraphViewProps = {
  articleData: ArticleResponse;
  handleGraphClick: (node: NodeObject) => void;
};

export const GraphView = ({
  articleData,
  handleGraphClick,
}: GraphViewProps) => {
  const [is3D, setIs3D] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedArticle, setSelectedArticle] = useState<
    Article | SimilarArticle
  >(articleData.original_article);

  const getNestedArticle = (
    node: NodeObject,
    currentArticleData: ArticleResponse,
  ) => {
    if (node.name === currentArticleData.original_article.title) {
      setSelectedArticle(currentArticleData.original_article);
      return;
    }

    for (const article of currentArticleData.similar_articles) {
      if (article.title === node.name) {
        setSelectedArticle(article);
        return;
      }
    }

    for (const article of currentArticleData.similar_articles) {
      if ("subArticles" in article && article.subArticles) {
        getNestedArticle(node, article.subArticles);
      }
    }
  };

  const handleToggle = (node: NodeObject) => {
    if (node) {
      setSelectedId(String(node.id));
      handleGraphClick(node);
      getNestedArticle(node, articleData);
      setIsModalOpen(true);
    }
  };

  const getSimilarArticles = () => {
    if (
      selectedArticle &&
      "subArticles" in selectedArticle &&
      selectedArticle.subArticles
    ) {
      return selectedArticle.subArticles.similar_articles;
    } else {
      return articleData.similar_articles;
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
      }}
    >
      <ArticleList similarArticles={getSimilarArticles()} />
      <ArticleInfo
        article={selectedArticle}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <Switch
        style={{ position: "absolute", zIndex: 2, right: 50, bottom: 50 }}
        checkedChildren={"3D"}
        unCheckedChildren={"2D"}
        onChange={() => setIs3D(!is3D)}
      />
      {is3D ? (
        <Graph3D
          articles={articleData}
          selectedId={selectedId}
          selectCallback={handleToggle}
        />
      ) : (
        <Graph2D
          articles={articleData}
          selectedId={selectedId}
          selectCallback={handleToggle}
        />
      )}
    </div>
  );
};
