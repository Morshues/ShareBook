import { SHARER_COLOR_NONE, SHARER_COLORS } from "@/constants/sharer_colors";

type PriceBarProps = {
  flows: {value: number, sharerId: number}[];
  value: number;
  showNumber?: boolean;
};

function PriceBar({flows, value, showNumber = false}: PriceBarProps) {

  return (
    <div className="flex flex-row w-full h-1 bg-default-300/50">
      {flows.map((flow, index) => {
        let p = 100 * flow.value / value;
        let color = SHARER_COLORS[index] || SHARER_COLOR_NONE;
        return (
          <div key={flow.sharerId} className={`h-full bg-${color}`} style={{width: p+'%'}}>{showNumber ? flow.value : ''}</div>
        )
      })}
    </div>
  );
}

export default PriceBar;