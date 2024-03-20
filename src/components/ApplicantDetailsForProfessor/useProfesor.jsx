import useAdminin from '../AadminPanel/useAdminin';
import { useNavigate } from 'react-router-dom';


export default function useProfesor() {
    const { isLoading } = useAdminin();

    const navigate = useNavigate();

    const handleItemClick = (item) => {
        navigate(`/profesor/${item.rut}`, { state: { postulante: item } });
    };

    return { handleItemClick, isLoading };
}