import Login from "./components/login";
import { Route } from "react-router-dom";
import Index from "./components/Index";
import AddNewMedicine from "./components/AddNewMedicine";
import "./tailwind.min.css";
import "./style.css";
import AddToPreviousMedicine from "./components/add_to_previous_medicine";
import AddVisitor from "./components/add_visitor";
import VisitorList from "./components/visitor_list";
import AddNewInvoice from "./components/invoice/add_new_invoice";
import AddNewCustomerInvoice from "./components/invoice/AddNewCustomerInvoice";
import AddPreviousCustomerInvoice from "./components/invoice/AddPreviousCustomerInvoice";
import InvoiceList from "./components/invoice/InvoiceList";

function App() {
  return (
    <>
      <Route exact path="/" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/addnewmedicine" component={AddNewMedicine} />
      <Route
        exact
        path="/addtopreviousmedicine"
        component={AddToPreviousMedicine}
      />
      <Route exact path="/addvisitor" component={AddVisitor} />
      <Route exact path="/visitorlist" component={VisitorList} />
      <Route exact path="/addnewinvoice" component={AddNewInvoice} />
      <Route
        exact
        path="/AddNewCustomerInvoice"
        component={AddNewCustomerInvoice}
      />
      <Route
        exact
        path="/AddPreviousCustomerInvoice"
        component={AddPreviousCustomerInvoice}
      />
      <Route exact path="/invoiceList" component={InvoiceList} />
    </>
  );
}

export default App;
