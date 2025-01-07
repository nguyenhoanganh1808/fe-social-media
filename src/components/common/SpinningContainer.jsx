import Spinner from "./Spinner/Spinner";

export default function SpinningContainer() {
  return (
    <div className="w-full flex justify-center mt-3">
      <Spinner borderWidth={3} />
    </div>
  );
}
