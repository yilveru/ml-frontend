import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
            Cerrar Sesión
        </button>
    )
};

export default LogoutButton;