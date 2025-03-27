import Navbar from './Navbar';

export default function CenteredPage({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-green-700">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
