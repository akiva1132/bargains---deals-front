import { createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { CarForSale } from './components/CarsForSale';
import { CarDetails } from './components/CarDetails';
import { AdministrationArea } from './components/AdministrationArea';
import { Header2 } from './tradingArea/components/Header2';
import { CarDetails2 } from './tradingArea/components/CarDetails2';
import { UserReferral } from './tradingArea/components/UserReferral';
import { AddCar2 } from './tradingArea/components/AddCar2';
import { Lot } from './tradingArea/components/Lot';
import { SignUp } from './tradingArea/components/SignUp';
import { GenerateCode } from './tradingArea/components/GenerateCode';
import RedirectComponent from './helpers/RedirectComponent';

export const router = createBrowserRouter([
  {
    path: "/to-car",
    element: <Header />,
    children: [
      {
        path: "/to-car/",
        element: <CarForSale />,
      },
      {
        path: "/to-car/car/:id",
        element: <CarDetails />,
      },
      {
        path: "/to-car/AdministrationArea",
        element: <AdministrationArea />,
      }
    ],
  },
  {
    path: "/tradingArea",
    element: <Header2 />,
    children: [
      {
        path: "/tradingArea/",
        element: <UserReferral />,
      },
      {
        path: "/tradingArea/car/:id",
        element: <CarDetails2 />,
      },
      {
        path: "/tradingArea/AddCar/",
        element: <AddCar2 />,
      },
      {
        path: "/tradingArea/lot/:userId",
        element: <Lot />,
      },
      {
        path: "/tradingArea/SignUp/",
        element: <SignUp />,
      },
      {
        path: "/tradingArea/GenerateCode/",
        element: <GenerateCode />,
      }
    ],
  },
  {
    path: "/",
    element: <RedirectComponent />,
  }
]);


