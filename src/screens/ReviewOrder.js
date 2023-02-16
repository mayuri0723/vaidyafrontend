import React, { useState, useEffect, useMemo, useCallback, Component } from 'react'
import { Container, Row, Card, Button } from 'react-bootstrap'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { listUserOrders } from '../actions/orderActions'
import { getAllOrders, updateOrderStatus } from '../actions/orderActions'
import { listProducts } from '../actions/productActions'
import { getUserInfoDetails } from '../actions/userActions'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';




const TextField = styled.input`
	height: 32px;
  width: 200px;
  border-radius: 3px;
	border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
  display: flex;
  align-items: center;
	justify-content: center;
`;

const ReviewOrder = ({ history }) => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();

  // Get user orders from Redux store
  const orderListUser = useSelector((state) => state.orderListUser)
  const { loading: loadingUserOrders, error: errorUserOrders, orders } = orderListUser
  console.log("User Orders->>",orders)




  //allorders
  const allOrders = useSelector((state) => state.allOrders)
  const { loading: loadingOrder, error: errorOrder, allorder } = allOrders
  // console.log('Orders of users',allorder)


  //ProductList
  const productDetails = useSelector((state) => state.productList)
  const { loading, error, products } = productDetails;


  // UserList
  const userDetails = useSelector((state) => state.userInfoDetails)
  const { users } = userDetails;
  // console.log("Data of user",userDetails)


  //Update order status
  const updateOrder = useSelector((state) => state.updateOrder)
  const { success } = updateOrder;




  let OrderList = [];
  let SubscriptionList = [];


  if (allorder) {
    allorder.forEach((items, index) => {

      let tempObj = {
        userId: items.user,
        id: 1,
        orderId: items._id,
        name: "",
        email: "",
        phone: "",
        address: items.shippingAddress.address,
        product: items.orderItems[0].name,
        productId: items.orderItems[0].product,
        status: items.orderItems[0].planStatus,
        quantity: items.orderItems[0].qty,
        totalPrice: items.totalPrice,
        stock: items.stock,
        packagetype: items.orderItems[0].isType,
        image: items.orderItems[0].image,
        plans: items.orderItems[0].name,
        validity: items.orderItems[0].validity,
        orderItems:items.orderItems,
      }


      if (items.orderItems[0].isType === "Tablets") {
        OrderList.push(tempObj)
      }
      else {

        SubscriptionList.push(tempObj)
      }

    })
  }
  // console.log("orderlist are", OrderList);
  // console.log("SubscriptionList are", SubscriptionList);


  let tempUser
  let tempUserId
  let tempEmail
  let tempPhone
  let orderUser

  users.forEach((userItems, index) => {
    OrderList.forEach((order, index) => {
      if (order.userId == userItems._id) {
        order.name = userItems.name;
        order.email = userItems.email;
        order.phone = userItems.phone;
      }
    })
    SubscriptionList.forEach((order, index) => {
      if (order.userId == userItems._id) {
        order.name = userItems.name;
        order.email = userItems.email;
        order.phone = userItems.phone;
      }
      // console.log("Order of subscription", order)
    })

    // console.log("New OrderList is", OrderList)
    // console.log("User Items Are", userItems);
  })
  products.forEach((productItems, index) => {
    OrderList.forEach((order, index) => {
      if (order.product_id == productItems._id) {
        order.stock = productItems.countInStock;

      }
    })
    SubscriptionList.forEach((order, index) => {
      if (order.product_id == productItems._id) {
        order.stock = productItems.countInStock;
      }
      // console.log("Order of subscription", order)
    })

    // console.log("New OrderList is", OrderList)
    // console.log("User Items Are", userItems);
  })


  const defaultColDef = useMemo(() => ({
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100
  }));

  //row data
  const [rowData] = useState([

    {
      id: 1,
      orderId: "orderid-11eopdnee2jn",
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "8483054848",
      address: "Pune",
      product: "Paracetamol",
      status: "Dispatched",
      quantity: "10",
      totalPrice: "10",
      stock: "90",
      packagetype: "isDiscreet",
      image: "asdcd",
    },
    {
      id: 2,
      orderId: "orderid-11eopdnee2jn",
      name: "Arbaaz",
      email: "arbaaz@gmail.com",
      phone: "8483054848",
      address: "Pune",
      product: "Paracetamol",
      status: "Dispatched",
      quantity: "10",
      totalPrice: "10",
      stock: "90",
      packagetype: "isDiscreet",
      image: "asdcd",
    },
    {
      id: 3,
      orderId: "orderid-11eopdnee2jn",
      name: "Neval",
      email: "Neval@gmail.com",
      phone: "8483054848",
      address: "Pune",
      product: "Paracetamol",
      status: "Dispatched",
      quantity: "10",
      totalPrice: "10",
      stock: "90",
      packagetype: "isDiscreet",
      image: "asdcd",
    },

    {
      id: 4,
      orderId: "orderid-11eopdnee2jn",
      name: "sapnil",
      email: "swapnil@gmail.com",
      phone: "8483054848",
      address: "Pune",
      product: "Paracetamol",
      status: "Delivered",
      quantity: "10",
      totalPrice: "10",
      stock: "90",
      packagetype: "isDiscreet",
      image: "asdcd",
    },
  ]);



  // order columns
  const [columnDefs] = useState([
    {
      headerName: 'Name',
      field: 'name',
      rowGroup: true,
    },
    { field: 'email' },
    { field: 'phone', },
    {
      headerName: 'Address',
      field: 'address',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Product',
      field: 'product',

    },
   
    {
      field: 'totalPrice',

    },
    { field: 'packagetype' },
    { field: 'stock' },
    {
      field: 'status',
      editable: true
    },
    { field: 'image' },
    {
      field: 'status',
      cellEditor: 'select',
      cellEditorParams: {
        values: ['Confirmed', 'Dispatched', 'Delivered'],
        editable: true
      }
    }
  ])

  // const onRowClicked(event) => {
  //   console.log('row', event)
  // }

  const onRowEditingStarted = useCallback((event) => {

  }, []);

  const onRowEditingStopped = useCallback((event) => {

  }, []);

  const onCellEditingStarted = useCallback((event) => {

  }, []);

  const onCellEditingStopped = useCallback((event) => {

    // console.log('cellEditingStopped ----->', event);
    // console.log("Order Id is", event.data.orderId);
    let orderItems ={
   
        product: event.data.orderItems[0].product,
        name: event.data.orderItems[0].name,
        image: event.data.orderItems[0].image,
        price: event.data.orderItems[0].price,
        countInStock: event.data.orderItems[0].countInStock,
        isType:event.data.orderItems[0].isType,
        validity:event.data.orderItems[0].validity,
        activationDate:event.data.orderItems[0].activationDate,
        expiryDate:event.data.orderItems[0].expiryDate,
        planStatus:event.value,
        qty:event.data.orderItems[0].qty,
   
    }
    dispatch(updateOrderStatus({ orderId: event.data.orderId, status: event.data.planStatus ,product:event.data.productId,orderItems:orderItems}, event.data.orderId))
    console.log(" After Dispatched Successfule ----->")
    window.location.reload();
    
  }, []);

  //subscription columns
  const [subscriptioncolumnDefs] = useState([
    {
      headerName: 'Name',
      field: 'name'
    },

    {
      field: 'email'
    },
    {
      field: 'phone',
    },
    {
      headerName: 'Address',
      field: 'address',
    },
    {
      field: 'plans',
    },
    {
      field: 'productId',
      hide:true
    },
    {
      field: 'totalPrice',
    },
    {
      headerName: 'Validity',
      field: 'validity',

    },

    {
      field: 'packagetype'
    },
    {
      field: 'stock'
    },
    {
      field: 'status'
    },
    {
      field: 'orderItems',
      hide :true
    },
    {
      field: 'status',
      cellEditor: 'select',
      cellEditorParams: {
        values: ['Active','Expired'],
        editable: true
      }
    },

  ])

  useEffect(() => {
    dispatch(listUserOrders());
    dispatch(getAllOrders());
    dispatch(listProducts());
    dispatch(getUserInfoDetails());



  }, [dispatch]);

  return (
    <Container>
      <Card className="text-center">
        <Card.Header> Review Order</Card.Header>
        <Card.Body>
          <Card.Title>
            <h1>Order List</h1>
          </Card.Title>


          <div id="myGrid" className="ag-theme-alpine" style={{ height: "500px" }}>
            <AgGridReact
              rowData={OrderList}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onRowEditingStarted={onRowEditingStarted}
              onRowEditingStopped={onRowEditingStopped}
              onCellEditingStarted={onCellEditingStarted}
              onCellEditingStopped={onCellEditingStopped}
            >
            </AgGridReact>
          </div>



          <h1> Subscription List</h1>

          <div id="myGrid" className="ag-theme-alpine" style={{ height: 500 }}>
            <AgGridReact
              rowData={SubscriptionList}
              columnDefs={subscriptioncolumnDefs}
              defaultColDef={defaultColDef}
              onRowEditingStarted={onRowEditingStarted}
              onRowEditingStopped={onRowEditingStopped}
              onCellEditingStarted={onCellEditingStarted}
              onCellEditingStopped={onCellEditingStopped}
            >
            </AgGridReact>
          </div>


        </Card.Body>
      </Card>

    </Container>
  );
}

export default ReviewOrder

