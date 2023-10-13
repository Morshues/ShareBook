import { SHARER_COLOR_NONE, SHARER_COLORS } from "@/constants/sharer_colors";
import { ItemFlow } from "@/types/ItemFlow";

type PriceBarProps = {
  flows: ItemFlow[];
  value: number;
};

function PriceBar({flows, value}: PriceBarProps) {

  return (
    <div className="flex flex-row w-full h-1 bg-default-300/50">
      {flows.map((flow, index) => {
        let p = 100 * flow.value / value;
        let color = SHARER_COLORS[index] || SHARER_COLOR_NONE;
        return (
          <div key={flow.sharerId} className={`h-full bg-${color}`} style={{width: p+'%'}} />
        )
      })}
    </div>
  );
}

export default PriceBar;