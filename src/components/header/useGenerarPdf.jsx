import axios from 'axios'
import { API } from "../../API";

export const useGenerarPdf = () => {

    const generarPDF = async () => {
        try {
            const response = await axios({
                url: `${API}/api/adminin/create-csv`, 
                method: 'POST',
                responseType: 'blob',
                data: {
                }
            });

            const file = new Blob([response.data], { type: 'application/csv' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', 'Reporte.csv'); 
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