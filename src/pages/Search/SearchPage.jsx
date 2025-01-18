import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { query } = useParams();
  return <div>{query}</div>;
}
