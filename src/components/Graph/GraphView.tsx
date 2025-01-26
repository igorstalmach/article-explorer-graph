import { Button, List, Modal, Switch } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import {  useRef, useState } from "react";
import Draggable from 'react-draggable';
import type { DraggableData, DraggableEvent } from 'react-draggable';

import { ArticleResponse, SimilarArticle } from "../../types";
import { Graph2D } from "./Graph2D.tsx";
import { Graph3D } from "./Graph3D.tsx";
import { NodeObject } from "react-force-graph-2d";

type GraphViewProps = {
  articleData: ArticleResponse;
  handleGraphClick: any
};

export const GraphView = ({ articleData, handleGraphClick }: GraphViewProps) => {
  const [is3D, setIs3D] = useState(false);
  const listRef = useRef<Array<HTMLDivElement | null>>([]);
  const subListRef = useRef<Array<HTMLDivElement | null>>([]);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null!);
  const [selectedId, setSelectedId] = useState<number | null | string>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const scrollToItem = (index : number) => {

    if (listRef.current[index]) {
      listRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

  };
  
  const handleToggle = (value: number | string, node?: NodeObject ) => {
    if (value !== 0 && (node !== undefined && node.id !== undefined && node.id !== null && node.id != 0)) {
      console.log(node.id.toString().split("-"))
      
      setSelectedId((prevValue) => (prevValue === node.id ? null : node.id));
      handleGraphClick(node)

        scrollToItem(Number.parseInt(node.id.toString().split("-")[0])-1)
    } else {
      setIsModalOpen(true);
    }
  };

  const toggleSubList = (index : number) => {
    if (subListRef.current[index]) {
      subListRef.current[index].style.display = subListRef.current[index].style.display === "none" ? "block" : "none"
    }
  };

  const renderListItems = (item: SimilarArticle, index: number, ) => (
    <span onClick={() => handleToggle(index + 1)}>
      <List.Item
      ref={(el) => (listRef.current[index] = el)}
      id={index + "-item"}
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
          {item.subArticles && 
          (
            <>
            <Button onClick={() => toggleSubList(index)}>Display sublist</Button> 
          <List
          ref={(el) => (subListRef.current[index] = el)}
            itemLayout="vertical"
            dataSource={item.subArticles.similar_articles}
            style={{
              display: "none",
              height: "20vh",
              overflow: "auto",
            }}
            renderItem={(item: SimilarArticle, index: number) =>renderListItems(item, index)}
          />
          </>)}
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
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        mask={false}
        footer={null}
        title={
          <div
            style={{ width: '100%', cursor: 'move' }}
            onMouseOver={() => {
              if (!isModalOpen) {
                // setIsModalOpen(true);
              }
            }}
            onMouseOut={() => {
              //setIsModalOpen(false);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Draggable Modal
          </div>
        }
        style={{
          right: "5rem",
          top: "15vh",
          margin: 0,
          position: "fixed",
          width: "10vw", // Adjust width as needed
          height: "45vh", // Full screen height
        }}
        modalRender={(modal) => (
<Draggable
      disabled={!isModalOpen}
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div ref={draggleRef}>{modal}</div>
        </Draggable>
        )}
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
              <a href={articleData.original_article.ids.arxiv_id} target="_blank">
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
