import { Breadcrumb } from "antd";
import { useMatches } from "react-router-dom";

export function Breadcrumbs() {
  let matches = useMatches();

  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean((match.handle as any)?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => (match.handle as any)?.crumb(match.params.id));

  return (
    <Breadcrumb
      style={{
        padding: "16px 24px",
      }}
    >
      {crumbs.map((crumb, index) => (
        <Breadcrumb.Item key={index}>{crumb}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
