import { NodeObject } from "react-force-graph-2d";

type ArticleIds = {
  arxiv_id?: string;
  doi?: string;
  scopus_id?: string;
};

type Article = {
  ids: ArticleIds;
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
};

type SimilarArticle = {
  ids: ArticleIds;
  title: string;
  authors: string[];
  abstract: string;
  similarity: number;
  subArticles?: ArticleResponse;
};

export type ArticleResponse = {
  original_article: Article;
  similar_articles: SimilarArticle[];
};

export type RequestParams = {
  article_id: string;
  site: "arxiv" | "scopus";
  id_type: "arxiv_doi" | "arxiv_id" | "scopus_doi" | "scopus_id";
  top_n?: number;
};

export type NodeType = {
  id: number;
  name: string;
  similarity: number;
  isTarget: boolean;
};

type GraphProps = {
  articles: ArticleResponse;
  selectedId: string | undefined;
  selectCallback: (value: number | string, node?: NodeObject) => void;
};

export type GraphNodeType = {
  id: number | string;
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  color: string;
  size?: number;
};

export type GraphLinkType = {
  source: number | string;
  target: number | string;
  distance?: number;
  color?: string;
  name?: string;
};

export type GraphData = {
  nodes: GraphNodeType[];
  links: GraphLinkType[];
};
