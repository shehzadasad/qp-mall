import { useEffect } from "react";
import { RouterProps, withRouter } from "react-router-dom";

export interface ScrollToTopProps {
  history: RouterProps["history"];
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default withRouter(ScrollToTop);
