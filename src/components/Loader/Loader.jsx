import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#2741d8"
        secondaryColor="#2741d8"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
