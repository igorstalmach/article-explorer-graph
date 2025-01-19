import { RequestParams } from "../types";

export const parseArticleString = (
  input: string,
  querySize: number,
): RequestParams | null => {
  const arxivIdRegex = /(?:https?:\/\/)?(?:arxiv\.org\/abs\/)?(\d{4}\.\d{5})/;
  const arxivIdMatch = input.match(arxivIdRegex);
  if (arxivIdMatch) {
    return {
      article_id: arxivIdMatch[1],
      site: "arxiv",
      id_type: "arxiv_id",
      top_n: querySize,
    };
  }

  const arxivDoiRegex =
    /(?:https?:\/\/)?(?:doi\.org\/)?(10\.48550\/arXiv\.\d{4}\.\d{5})/;
  const arxivDoiMatch = input.match(arxivDoiRegex);
  if (arxivDoiMatch) {
    return {
      article_id: arxivDoiMatch[1],
      site: "arxiv",
      id_type: "arxiv_doi",
      top_n: querySize,
    };
  }

  const scopusIdRegex = /^(SCOPUS_ID:\d{11})$/;
  const scopusIdMatch = input.match(scopusIdRegex);
  if (scopusIdMatch) {
    return {
      article_id: scopusIdMatch[1],
      site: "scopus",
      id_type: "scopus_id",
      top_n: querySize,
    };
  }

  const scopusDoiRegex = /^(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)$/i;
  const scopusDoiMatch = input.match(scopusDoiRegex);
  if (scopusDoiMatch) {
    return {
      article_id: scopusDoiMatch[1],
      site: "scopus",
      id_type: "scopus_doi",
      top_n: querySize,
    };
  }

  return null;
};
