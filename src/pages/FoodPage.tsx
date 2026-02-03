import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodLogger from '../components/FoodLogger';
import Navbar from '../components/Navbar';

export default function FoodPage() {
    const navigate = useNavigate();
    const [, setRefresh] = useState(0);

    const handleUpdate = () => {
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="app-container">
            <div className="page">
                <div className="page-header">
                    <button className="btn btn-secondary btn-small" onClick={() => navigate('/')}>
                        Terug
                    </button>
                </div>

                <FoodLogger onUpdate={handleUpdate} />
            </div>

            <Navbar />

            <style>{`
        .page-header {
          margin-bottom: var(--space-lg);
        }
      `}</style>
        </div>
    );
}
