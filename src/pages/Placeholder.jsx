import CenteredPage from '../components/CenteredPage';

export default function Placeholder({ title }) {
  return (
    <CenteredPage>
      <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">{title}</h2>
      <p className="text-gray-600 text-center">Contenido en construcción.</p>
    </CenteredPage>
  );
}
