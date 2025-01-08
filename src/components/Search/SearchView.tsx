import { Input, Tooltip } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { parseArticleString } from "../../utils/utils";
import { RequestParams } from "../../types";

const { Search } = Input;
const { Title } = Typography;

export const SearchView = ({ handleSearch, isActive }: { handleSearch: (arg0: RequestParams | null) => void , isActive: boolean}) => {
  const [articleLink, setArticleLink] = useState("")
  
  const handleSubmitSearch = () => {
    handleSearch(parseArticleString(articleLink))
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      } }
    >
      <div
        style={ isActive? {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "clamp(300px, 50%, 500px)",
        }:
        {
          position: "absolute",
          zIndex: 99,
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "1rem",
          alignItems: "center",
          width: "clamp(300px, 50%, 500px)",
        }}
      >
        {isActive && <Title>Article Explorer</Title>}
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
  );
};
