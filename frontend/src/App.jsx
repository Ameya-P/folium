import "./styles/App.css"
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import AddPlantPage from './pages/AddPlantPage'
import CollectionPage from './pages/CollectionPage'
import DetailPage from './pages/DetailPage'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
    {
      path: '/', 
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <WelcomePage />},
        { path: '/add', element: <AddPlantPage />},
        { path: '/plants', element: <CollectionPage />},
        { path: '/plants/:id', element: <DetailPage />},
      ]
    }
  ]);

export default function App() {
    return (
      <RouterProvider router={router} />
    )
}
       