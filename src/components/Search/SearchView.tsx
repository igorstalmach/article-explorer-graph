import { Input, Tooltip } from "antd";
import { Typography } from "antd";

const { Search } = Input;
const { Title } = Typography;

export const SearchView = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "clamp(300px, 50%, 500px)",
        }}
      >
        <Title>Article Explorer</Title>
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
            enterButton
          />
        </Tooltip>
      </div>
    </div>
  );
};
