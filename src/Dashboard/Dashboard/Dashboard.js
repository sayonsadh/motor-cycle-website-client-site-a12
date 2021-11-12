import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import CreateAdmin from '../../CreateAdmin/CreateAdmin';
import useAuth from '../../hooks/useAuth';
import MyPreOrders from '../../MyPreOrders/MyPreOrders';
import AddProducts from '../../Pages/AddProducts/AddProducts';
import AdminRoute from '../../Pages/Login/AdminRoute/AdminRoute';
import PrivateRoute from '../../Pages/Login/PrivateRoute/PrivateRoute';
import ManageAllProducts from '../../Pages/ManageAllProducts/ManageAllProducts';
import ManageAllOrder from '../ManageAllOrder/ManageAllOrder';
import ManageAllPreOrder from '../ManageAllPreOrder/ManageAllPreOrder';
import MyOrders from '../MyOrders/MyOrders';
import Payment from '../Payment/Payment';
import Review from '../Review/Review';
import { BsFillCartPlusFill, BsFillCreditCard2BackFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { RiShoppingBasketFill } from "react-icons/ri";
import { FaHandHolding, FaShopify, FaMotorcycle } from "react-icons/fa";
import { MdManageAccounts, MdWifiProtectedSetup, MdRateReview } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import DashboardHome from '../DashboardHome/DashboardHome';

const Dashboard = () => {
  const { user, admin } = useAuth();
  let { path, url } = useRouteMatch();
  return (
    <div>
      <button className="btn btn-light border border-dark  bg-light text-dark bg-opacity-50 mt-2 mb-5" style={{ justifyContent: 'end' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><AiOutlineMenuUnfold /> Click Here For More Features</button>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <div className="text-start text-dark">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQBIapOi7sG90qrv25QoxZkYRxc3vG6ddKqpaACQ8HC6R-gbSX-P7kSxk-ROqvD7UgU8&usqp=CAU" alt="Girl in a jacket" className="mt-2 mb-2" width="35px" />
            <h6 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Name:     {user.displayName}</h6>
            <h6 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Email:     {user.email}</h6>
          </div>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr />
        <div className="offcanvas-body ">
          <div className="text-start">
            <p className="p-2 font-monospace"><Link className="text-decoration-none fw-bold fs-5" to="/home">SAYON MOTORS <FaMotorcycle /> </Link> IS A TRUSTED SHOP FOR BUY YOUR FAVORITE BIKE.</p>
            {user?.email && <div>
              <p>
                <Link className="text-decoration-none text-start p-2 m-5 text-dark" to={`${url}/myorders`}> <RiShoppingBasketFill className="me-2" /> My Orders</Link>
              </p>
              <p>
                <Link className="text-decoration-none text-start p-2 m-5 text-dark" to={`${url}/mypreorders`}> <FaHandHolding className="me-2" /> My Pre-Orders</Link>
              </p></div>}
            {admin &&
              <div>
                <p>
                  <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/manageallorder`}> <MdManageAccounts className="me-2" /> Manage All Order</Link>
                </p>
                <p>
                  <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/manageallpreorders`}> <MdWifiProtectedSetup className="me-2" /> Manage All Pre-Orders</Link>
                </p>
                <p>
                  <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/addproducts`}> <BsFillCartPlusFill className="me-2" />  Add Products</Link>
                </p>
                <p>
                  <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/manageallproducts`}> <FaShopify className="me-2" />  Manage All Products</Link>
                </p>
                <p>
                  <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/createadmin`}> <IoMdPersonAdd className="me-2" /> Create Admin</Link>
                </p>
              </div>}
            {user?.email && <div>
              <p>
                <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/payment`}> <BsFillCreditCard2BackFill className="me-2" /> payment </Link>
              </p>
              <p>
                <Link className="text-decoration-none m-5 p-2 text-dark" to={`${url}/review`}> <MdRateReview className="me-2" /> Review</Link>
              </p>
            </div>}
          </div>
        </div>
      </div>
      <Switch>

        <Route exact path={path}>
          <DashboardHome></DashboardHome>
        </Route>

        <PrivateRoute path={`${path}/payment`}>
          <Payment></Payment>
        </PrivateRoute>

        <AdminRoute path={`${path}/manageallorder`}>
          <ManageAllOrder></ManageAllOrder>
        </AdminRoute>

        <PrivateRoute path={`${path}/myorders`}>
          <MyOrders></MyOrders>
        </PrivateRoute>

        <PrivateRoute path={`${path}/mypreorders`}>
          <MyPreOrders></MyPreOrders>
        </PrivateRoute>

        <AdminRoute path={`${path}/manageallpreorders`}>
          <ManageAllPreOrder></ManageAllPreOrder>
        </AdminRoute>

        <AdminRoute path={`${path}/addproducts`}>
          <AddProducts></AddProducts>
        </AdminRoute>

        <AdminRoute path={`${path}/manageallproducts`}>
          <ManageAllProducts></ManageAllProducts>
        </AdminRoute>

        <AdminRoute path={`${path}/createadmin`}>
          <CreateAdmin></CreateAdmin>
        </AdminRoute>

        <PrivateRoute path={`${path}/review`}>
          <Review></Review>
        </PrivateRoute>

      </Switch>
    </div>
  );
};

export default Dashboard;