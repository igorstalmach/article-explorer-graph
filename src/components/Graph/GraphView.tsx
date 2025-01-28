import { Switch } from "antd";
import { useRef, useState } from "react";
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
  const listRef = useRef<Array<HTMLDivElement | null>>([]);

  const [is3D, setIs3D] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedArticle, setSelectedArticle] = useState<
    Article | SimilarArticle
  >(articleData.original_article);

  const scrollToItem = (index: number) => {
    if (listRef.current[index]) {
      listRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleToggle = (node: NodeObject) => {
    if (node && node.id && String(node.id) !== "0") {
      setSelectedId((prevValue) =>
        prevValue === node.id ? undefined : String(node.id),
      );
      handleGraphClick(node);
      scrollToItem(Number.parseInt(String(node.id).split("-")[0]) - 1);

      const selectedArticle =
        articleData.original_article.title === node.name
          ? articleData.original_article
          : articleData.similar_articles.find(
              (article) => article.title === node.name,
            );
      setSelectedArticle((prevState) => selectedArticle || prevState);
    } else {
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
      <ArticleList listRef={listRef} similarArticles={getSimilarArticles()} />
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
