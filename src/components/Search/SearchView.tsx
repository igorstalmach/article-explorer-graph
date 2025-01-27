import { Input, Select, Space, Tooltip } from "antd";
import { Typography } from "antd";
import { useState } from "react";

import { RequestParams } from "../../types";
import { parseArticleString } from "../../utils";

const { Search } = Input;
const { Title } = Typography;

type SearchViewProps = {
  handleSearch: (arg0: RequestParams | null) => void;
  isActive: boolean;
  querySizeCallback: (arg0: number) => void;
};

export const SearchView = ({
  handleSearch,
  isActive,
  querySizeCallback,
}: SearchViewProps) => {
  const [articleLink, setArticleLink] = useState("");
  const [querySize, setQuerySize] = useState(5);

  const handleQuerySize = (size: number) => {
    setQuerySize(size);
    querySizeCallback(size);
  };

  const handleSubmitSearch = () => {
    handleSearch(parseArticleString(articleLink, querySize));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={
          isActive
            ? {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "clamp(300px, 50%, 500px)",
              }
            : {
                position: "absolute",
                zIndex: 99,
                top: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "1rem",
                alignItems: "center",
                width: "clamp(300px, 50%, 500px)",
              }
        }
      >
        {isActive && <Title>Article Explorer</Title>}
        <Space.Compact
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <Select
            defaultValue="5"
            style={{ width: 70 }}
            onChange={(value) => handleQuerySize(Number.parseInt(value))}
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "15", label: "15" },
              { value: "20", label: "20" },
            ]}
          />
          <Tooltip
            trigger={["focus"]}
            title={
              "An article ID (e.g. 2412.12081) or a link to arXiv or Scopus is required"
            }
            placement="bottomLeft"
          >
            <Search
              style={{ width: "100%" }}
              placeholder="Link to article..."
              onChange={(e) => setArticleLink(e.target.value)}
              onSearch={handleSubmitSearch}
              enterButton
            />
          </Tooltip>
        </Space.Compact>
      </div>
    </div>
  );
};
