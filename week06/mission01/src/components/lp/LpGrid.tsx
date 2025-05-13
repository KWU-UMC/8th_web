import { Lp } from "../../types/lp";
import LpCard from "./LpCard";

interface Props {
  lps: Lp[];
}

const LpGrid = ({ lps }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto mt-8">
      {lps.map((lp) => (
        <LpCard key={lp.id} lp={lp} />
      ))}
    </div>
  );
};

export default LpGrid;
