interface AppError extends Error {
    status?: number;
}

try {
    const error = new Error('Page not found') as AppError;
    error.status = 404;
    throw error;
} catch (e) {
    const error = e as AppError; 
    console.log(error.message);
    console.log(error.status);
}