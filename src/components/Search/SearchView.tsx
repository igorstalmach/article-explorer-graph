import { Input, Select, Tooltip } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { parseArticleString } from "./utils";
import { RequestParams } from "../../types";

const { Search } = Input;
const { Title } = Typography;

type SearchViewProps = {
  handleSearch: (arg0: RequestParams | null) => void;
  isActive: boolean;
};

export const SearchView = ({ handleSearch, isActive }: SearchViewProps) => {
  const [articleLink, setArticleLink] = useState("");
  const [querySize, setQuerySize] = useState(5);

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

        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <Select
            defaultValue="5"
            style={{ width: 70 }}
            onChange={(value) => setQuerySize(Number.parseInt(value))}
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
              "Supported formats: arXiv link or arXiv article ID (e.g. 2412.12081)"
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
        </div>
      </div>
    </div>
  );
};
