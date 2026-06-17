import { TbLoader3 } from "react-icons/tb";

function Loader({ size = 20 }) {
  return (
    <div className="flex items-center justify-center p-4">
      <TbLoader3 className="animate-spin" style={{ fontSize: `${size}px` }} />
    </div>
  );
}

export default Loader;
