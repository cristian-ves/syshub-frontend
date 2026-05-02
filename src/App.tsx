import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'sonner';

export const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                    style: {
                        marginTop: '73px',
                    },
                }}
            />
            <RouterProvider router={router} />
        </>
    );
};

export default App;