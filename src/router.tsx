import { createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { CarForSale } from './components/CarsForSale';
import { CarDetails } from './components/CarDetails';

export const router = createBrowserRouter([
  {

    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <CarForSale />,
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },
      // {
      //   path: "/erp/products",
      //   element: <Products />,
      // },
      // {
      //   path: "/erp/product/:productId",
      //   element: <ProductDetailsPage />,
      // },
      // {
      //   path: "/erp/AddProduct",
      //   element: <AddProduct />,
      // },
      // {
      //   path: "/erp/AddProduct/:id",
      //   element: <AddProduct />,
      // },
    ],
  },
]);


