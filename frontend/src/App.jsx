import "./styles/App.css"
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import AddPlantPage from './pages/AddPlantPage'
import DetailedAddPlantPage from "./pages/DetailedAddPlantPage"
import BulkAddPlantPage from "./pages/BulkAddPlantPage"
import CollectionPage from './pages/CollectionPage'
import DetailPage from './pages/DetailPage'
import Layout from './components/Layout'
import NotFoundPage from './pages/NotFoundPage'
import HouseplantExplorerPage from "./pages/HouseplantExplorerPage"

const router = createBrowserRouter([
    {
      path: '/', 
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <WelcomePage />},
        { path: 'add', element: <AddPlantPage />},
        { path: 'add/details', element: <DetailedAddPlantPage />},
        { path: 'add/bulk', element: <BulkAddPlantPage />},
        { path: 'plants', element: <CollectionPage />},
        { path: 'plants/:id', element: <DetailPage />},
        { path: 'explore', element: <HouseplantExplorerPage />},
      ]
    }
  ]);

export default function App() {
    return (
      <RouterProvider router={router} />
    )
}