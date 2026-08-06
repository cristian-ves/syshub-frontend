import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'sonner';
import { ConnectionOverlay } from './components/common';

export const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                richColors
                closeButton
                duration={3000}
                toastOptions={{
                    style: {
                        marginTop: '73px',
                    },
                }}
            />
            <ConnectionOverlay />
            <RouterProvider router={router} />
        </>
    );
};

export default App;