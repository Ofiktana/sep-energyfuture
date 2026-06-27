export default function CircuitSVG() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`
            .cline { stroke: rgba(249,224,118,0.35); stroke-width:1; fill:none; }
            .cdot  { fill: rgba(249,224,118,0.55); }
            @keyframes cpulse {
              0%,100% { opacity:0.4; }
              50%     { opacity:1; }
            }
            .cg1 { animation: cpulse 2.4s ease-in-out infinite; }
            .cg2 { animation: cpulse 2.4s ease-in-out infinite 0.8s; }
            .cg3 { animation: cpulse 2.4s ease-in-out infinite 1.6s; }
          `}
        </style>
      </defs>
      <g className="cg1">
        <line className="cline" x1="10" y1="20" x2="40" y2="20" />
        <line className="cline" x1="40" y1="20" x2="40" y2="50" />
        <circle className="cdot" cx="10" cy="20" r="2" />
        <circle className="cdot" cx="40" cy="50" r="2" />
      </g>
      <g className="cg2">
        <line className="cline" x1="60" y1="10" x2="60" y2="40" />
        <line className="cline" x1="60" y1="40" x2="90" y2="40" />
        <circle className="cdot" cx="60" cy="10" r="2" />
        <circle className="cdot" cx="90" cy="40" r="2" />
      </g>
      <g className="cg3">
        <line className="cline" x1="20" y1="70" x2="50" y2="70" />
        <line className="cline" x1="50" y1="70" x2="50" y2="90" />
        <circle className="cdot" cx="20" cy="70" r="2" />
        <circle className="cdot" cx="50" cy="90" r="2" />
      </g>
      <g className="cg1">
        <line className="cline" x1="70" y1="60" x2="70" y2="80" />
        <line className="cline" x1="70" y1="80" x2="90" y2="80" />
        <circle className="cdot" cx="70" cy="60" r="2" />
        <circle className="cdot" cx="90" cy="80" r="2" />
      </g>
      <g className="cg2">
        <line className="cline" x1="10" y1="50" x2="30" y2="50" />
        <line className="cline" x1="30" y1="50" x2="30" y2="90" />
        <circle className="cdot" cx="10" cy="50" r="2" />
        <circle className="cdot" cx="30" cy="90" r="2" />
      </g>
    </svg>
  );
}
