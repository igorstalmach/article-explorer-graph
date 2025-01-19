import { List, Modal, Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";

import { ArticleResponse, SimilarArticle } from "../../types";
import { Graph2D } from "./Graph2D.tsx";
import { Graph3D } from "./Graph3D.tsx";

type GraphViewProps = {
  articleData: ArticleResponse;
};

export const GraphView = ({ articleData }: GraphViewProps) => {
  const [is3D, setIs3D] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleToggle = (value: number) => {
    if (value !== 0) {
      setSelectedId((prevValue) => (prevValue === value ? null : value));
    }
  };

  const renderListItems = (item: SimilarArticle, index: number) => (
    <span onClick={() => handleToggle(index + 1)}>
      <List.Item
        style={{
          padding: "1rem",
          backgroundColor: selectedId == index + 1 ? "#cfcaca" : "",
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
              <strong>Arxiv ID:</strong> {item.ids.arxiv_id}
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
      </List.Item>
    </span>
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
      }}
    >
      <List
        itemLayout="vertical"
        dataSource={articleData.similar_articles}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
        renderItem={renderListItems}
      />
      <Modal
        open={true}
        closable={false}
        mask={false}
        footer={null}
        style={{
          right: "10rem",
          top: "25vh",
          margin: 0,
          position: "fixed",
          width: "30vw", // Adjust width as needed
          height: "100vh", // Full screen height
        }}
      >
        <h3>
          <b
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.75rem",
              letterSpacing: "0.1px",
            }}
          >
            {articleData.original_article.title}
          </b>
        </h3>
        <p>
          {articleData.original_article.authors.map((author, authorIndex) => (
            <b key={authorIndex} style={{ opacity: "0.5" }}>
              {author}
              {authorIndex < articleData.original_article.authors.length - 1
                ? ", "
                : ""}
            </b>
          ))}
        </p>
        <p style={{ paddingTop: "0.75rem" }}>
          <Paragraph
            style={{
              fontSize: "1rem",
              maxHeight: "25vh",
              overflowY: "scroll",
            }}
          >
            {articleData.original_article.abstract}
          </Paragraph>
          <div>
            {articleData.original_article.ids.arxiv_id && (
              <a href={articleData.original_article.ids.arxiv_id}>
                <strong>Arxiv ID:</strong>{" "}
                {articleData.original_article.ids.arxiv_id}
              </a>
            )}
            {articleData.original_article.ids.doi && (
              <div>
                <strong>DOI:</strong> {articleData.original_article.ids.doi}
              </div>
            )}
            {articleData.original_article.ids.scopus_id && (
              <a href={articleData.original_article.ids.scopus_id}>
                <strong>Scopus ID:</strong>{" "}
                {articleData.original_article.ids.scopus_id}
              </a>
            )}
          </div>
        </p>
      </Modal>
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
