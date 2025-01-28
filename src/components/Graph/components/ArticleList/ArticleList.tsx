import { Button, List } from "antd";
import { MutableRefObject, useRef } from "react";

import { SimilarArticle } from "../../../../types";

type ArticleListProps = {
  similarArticles: SimilarArticle[];
  listRef: MutableRefObject<Array<HTMLDivElement | null>>;
};

export const ArticleList = ({ similarArticles, listRef }: ArticleListProps) => {
  const subListRef = useRef<Array<HTMLDivElement | null>>([]);

  const toggleSubList = (index: number) => {
    if (subListRef.current[index]) {
      subListRef.current[index].style.display =
        subListRef.current[index].style.display === "none" ? "block" : "none";
    }
  };

  const renderListItems = (item: SimilarArticle, index: number) => (
    <span>
      <List.Item
        ref={(el) => (listRef.current[index] = el)}
        id={index + "-item"}
        style={{
          padding: "1rem",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <List.Item.Meta
          title={item.title}
          key={index}
          description={item.abstract}
        />
        <div>
          <b>Authors: </b>
          {item.authors.map((author, authorIndex) => (
            <span key={authorIndex}>
              {author}
              {authorIndex < item.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div>
          {item.ids.arxiv_id && (
            <div>
              <a href={item.ids.arxiv_id} target="_blank">
                <strong>Arxiv ID:</strong> {item.ids.arxiv_id}
              </a>
            </div>
          )}
          {item.ids.doi && (
            <div>
              <strong>DOI:</strong> {item.ids.doi}
            </div>
          )}
          {item.ids.scopus_id && (
            <div>
              <strong>Scopus ID:</strong> {item.ids.scopus_id}
            </div>
          )}
        </div>
        <b>Similarity: </b> {(item.similarity * 100).toFixed(2)}%
        <div style={{ paddingTop: "1rem" }}>
          {item.subArticles && (
            <>
              <Button onClick={() => toggleSubList(index)}>
                Display sublist
              </Button>
              <List
                ref={(el) => (subListRef.current[index] = el)}
                itemLayout="vertical"
                dataSource={item.subArticles.similar_articles}
                style={{
                  display: "none",
                  height: "20vh",
                  overflow: "auto",
                }}
                renderItem={(item: SimilarArticle, index: number) =>
                  renderListItems(item, index)
                }
              />
            </>
          )}
        </div>
      </List.Item>
    </span>
  );

  return (
    <List
      itemLayout="vertical"
      dataSource={similarArticles}
      style={{
        height: "100vh",
        overflow: "auto",
      }}
      renderItem={renderListItems}
    />
  );
};
