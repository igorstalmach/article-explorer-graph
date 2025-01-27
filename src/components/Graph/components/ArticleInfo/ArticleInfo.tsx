import { Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useRef, useState } from "react";
import Draggable, {
  type DraggableData,
  type DraggableEvent,
} from "react-draggable";

import { ArticleResponse } from "../../../../types";

type ArticleInfoProps = {
  articleData: ArticleResponse;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const ArticleInfo = ({
  articleData,
  isOpen,
  setIsOpen,
}: ArticleInfoProps) => {
  const draggableRef = useRef<HTMLDivElement>(null!);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggableRef.current?.getBoundingClientRect();

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

  const renderData = () => (
    <>
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
      <div style={{ paddingTop: "0.75rem" }}>
        <Paragraph
          style={{
            fontSize: "1rem",
            maxHeight: "25vh",
            overflowY: "scroll",
          }}
        >
          {articleData.original_article.abstract}
        </Paragraph>
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
    </>
  );

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      mask={false}
      footer={null}
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
          disabled={!isOpen}
          bounds={bounds}
          nodeRef={draggableRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggableRef}>{modal}</div>
        </Draggable>
      )}
    >
      {renderData()}
    </Modal>
  );
};
