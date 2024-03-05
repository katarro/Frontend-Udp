import axios from 'axios'
import { API } from "../../API";

export const useGenerarPdf = () => {

    const generarPDF = async () => {
        try {
            const response = await axios({
                url: `${API}/api/adminin/create-pdf`, // Asegúrate de que la URL coincida con tu configuración del servidor
                method: 'POST',
                responseType: 'blob', // Importante
                data: {
                }
            });

            // Crear un enlace para descargar el PDF
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', 'Seleccionados.pdf'); // cualquier nombre de archivo
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            if (error.response) {
                console.error('Error', error.message);
            }
        }

    }

    return [generarPDF];
}