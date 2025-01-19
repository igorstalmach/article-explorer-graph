import { useState } from "react";
import { List, Modal, Switch, Typography } from "antd";
import { Graph3D } from "./Graph3D.tsx";
import { Graph2D } from "./Graph2D.tsx";
import { ArticleResponse } from "../../types";
import Paragraph from "antd/es/typography/Paragraph";


export const GraphView = ({
  articleData
}: {
  articleData: ArticleResponse;
}) => {
  const [is3D, setIs3D] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

  const handleToggle = (value: number) => {
    if(value !== 0){
      setSelectedId((prevValue) => (prevValue === value ? null : value));

    }
  };
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
          height:"100vh",
          overflow: "auto"
        }}
        renderItem={(item, index) => (
          <span onClick={() => handleToggle(index + 1)}>
            <List.Item
              style={{
                padding: "1rem",
                backgroundColor: selectedId == index+1 ? "#cfcaca" : ""
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
              <b>Similiarity: </b> {(item.similarity * 100).toFixed(2)}%
            </List.Item>
          </span>
        )}
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
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
          <b>{articleData.original_article.title}</b>
        </h3>
        <p>
          {articleData.original_article.authors.map((author, authorIndex) => (
            <Typography key={authorIndex} >
             <b> {author}
              {authorIndex < articleData.original_article.authors.length - 1
                ? ", "
                : ""}
                </b>
            </Typography>
          ))}
        </p>
        <p>
          <Paragraph style={{fontSize: "1rem"}}>{articleData.original_article.abstract}</Paragraph>
          <div>
            {articleData.original_article.ids.arxiv_id && (
              <div>
                <strong>Arxiv ID:</strong>{" "}
                {articleData.original_article.ids.arxiv_id}
              </div>
            )}
            {articleData.original_article.ids.doi && (
              <div>
                <strong>DOI:</strong> {articleData.original_article.ids.doi}
              </div>
            )}
            {articleData.original_article.ids.scopus_id && (
              <div>
                <strong>Scopus ID:</strong>{" "}
                {articleData.original_article.ids.scopus_id}
              </div>
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
        <Graph3D articles={articleData} selectedId={selectedId} selectCallback={handleToggle}/>
      ) : (
        <Graph2D articles={articleData} selectedId={selectedId} selectCallback={handleToggle}/>
      )}
    </div>
  );
};
