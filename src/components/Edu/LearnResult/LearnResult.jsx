import { useEffect, useMemo, useState } from "react";
import ScoreTable from "./Table";
import { EduService } from "../../../services/edu.service";
import { Select } from "flowbite-react";
import SpinningContainer from "../../common/SpinningContainer";

export default function LearnResult() {
  const [resultScore, setResultScore] = useState([]);
  const [activeSemi, setActiveSemi] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const result = await EduService.fetchScore();
      if (result.success) {
        setResultScore(result.data);
        setActiveSemi(result.data[0].name);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  console.log("result: ", resultScore);
  const semesterData = useMemo(() => {
    return resultScore.find((result) => result.name === activeSemi);
  }, [resultScore, activeSemi]);

  if (loading) return <SpinningContainer />;

  return (
    <div className="w-full h-full p-3 space-y-3">
      <Select
        value={activeSemi}
        onChange={(e) => setActiveSemi(e.target.value)}
        className="w-fit"
        id="scores"
        required
      >
        {resultScore.map((score, index) => (
          <option key={`${score.name}-${index}`} value={score.name}>
            {score.name}
          </option>
        ))}
      </Select>
      <ScoreTable semesterData={semesterData} />
    </div>
  );
}
