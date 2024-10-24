export const dinasColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const tengahColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const baratColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const timurColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const selatanColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const utaraColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const banyumanikColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const candisariColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const gajahmungkurColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const genukColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const gunungpatiColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const mijenColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const ngaliyanColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const pedurunganColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const tembalangColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];

export const tuguColumns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "NIK", headerName: "NIK", width: 250 },
    { field: "NAMA", headerName: "NAMA", width: 400 },
    {
        field: "KETERANGAN",
        headerName: "KETERANGAN",
        type: "text",
        width: 200,
    },
    {
        field: "Date",
        headerName: "TANGGAL",
        width: 200,
        sortComparator: (v1, v2) => {
            // Check if v1 or v2 is undefined or null
            if (!v1) return -1;
            if (!v2) return 1;
    
            try {
                // Convert DD/MM/YYYY to YYYY-MM-DD
                const date1 = new Date(v1.split('/').reverse().join('-')); 
                const date2 = new Date(v2.split('/').reverse().join('-'));
                return date1 - date2;
            } catch (error) {
                console.error("Date conversion error:", error);
                return 0; // or any default behavior in case of error
            }
        },
    }
];
