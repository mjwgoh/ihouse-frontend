export default function TitleBar({ children }) {
  return (
    <div className="flex w-full h-20 items-center p-5 px-10 border-white-100 border text-white-900">
      <h1>{children}</h1>
    </div>
  );
}
