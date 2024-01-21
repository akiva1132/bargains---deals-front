import { createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { CarForSale } from './components/CarForSale';

export const router = createBrowserRouter([
  {

    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <CarForSale />,
      },
      // {
      //   path: "/erp/signUp",
      //   element: <SignUpForm />,
      // },
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


