type ArticleIds = {
  arxiv_id: string;
  doi: string;
  scopus_id: string;
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
  selectedId: number | null;
  selectCallback: (value: number) => void;
};

export type GraphNodeType = {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  z?: number;
  color: string;
  size?: number;
};

export type GraphLinkType = {
  source: number;
  target: number;
  distance?: number;
  color?: string;
  name?: string;
};

export type GraphData = {
  nodes: GraphNodeType[];
  links: GraphLinkType[];
};
