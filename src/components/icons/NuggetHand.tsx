import nuggetLogo from "../../assets/nugget-logo.png";

const NuggetHand = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <img
    src={nuggetLogo}
    alt="Nugget"
    style={{ width, height }}
    className="object-contain rounded-full"
  />
);

export default NuggetHand;
