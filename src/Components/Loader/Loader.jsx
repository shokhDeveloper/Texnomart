import "./loader.scss";
import { Circles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="loader">
      <div className="container">
        <Circles
          height="80"
          width="80"
          radius="9"
          color="#FBC100"
          ariaLabel="loader"
        />
      </div>
    </div>
  );
};
