export default function CenteredBox({ children }) {
  return (
    <div className="bg-yellow-400 text-black rounded-xl shadow-2xl p-6 max-w-xl w-full text-center border-2 border-black">
      {children}
    </div>
  );
}
