import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const FeaturePage = ({ title, description, backTo }) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">{title}</h1>
        <p className="text-slate-600 mb-6">{description}</p>
        <Link to={backTo}>
          <Button>Back to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
};

export default FeaturePage;
