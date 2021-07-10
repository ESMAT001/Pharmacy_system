import Login from "./components/login";
import { Route } from "react-router-dom";
import Index from "./components/Index";
import AddNewMedicine from "./components/AddNewMedicine"
import "./tailwind.min.css";
import "./style.css";
import AddToPreviousMedicine from "./components/add_to_previous_medicine";
import AddVisitor from "./components/add_visitor";
import VisitorList from "./components/visitor_list";
import AddNewInvoice from "./components/invoice/add_new_invoice";
import AddNewCustomerInvoice from "./components/invoice/AddNewCustomerInvoice";
import AddPreviousCustomerInvoice from "./components/invoice/AddPreviousCustomerInvoice";
import InvoiceList from "./components/invoice/InvoiceList";
import SampleDistribution from "./components/invoice/SampleDistribution";
import SampleDistributionList from "./components/invoice/SampleDistributionList";
import CustomerList from "./components/customerList";
import StockRoomView from "./components/StockModule/StockRoomView";
import AddToLooseStock from "./components/StockModule/AddToLooseStock";
import LooseStockList from "./components/StockModule/LooseStockList";
import VisitorSellInformation from "./components/VisitorSellInformation";
import Ledger from "./components/ledger_module/Ledger";
import LedgerReciptAdd from "./components/ledger_module/LedgerReciptAdd";
import LedgerReciptList from "./components/ledger_module/LedgerReciptList";
import AddExpense from "./components/expense_module/Add_expense";
import ExpenseList from "./components/expense_module/ExpenseList";
import FinancePage from "./components/finance_module/financePage";
import CalculatePerDay from "./components/finance_module/CalculatePerDay";
import CalculatePerMonth from "./components/finance_module/CalculatePerMonth";
import CalculatePerYear from "./components/finance_module/CalculatePerYear";
import Users from "./components/user_module/Users";
import Backup from "./components/backup_module/Backup";
import AddSupplier from "./components/invoice/AddSupplier";
import TotalCustomerOgrayi from "./components/ledger_module/TotalCustomerOgrayi";
import TotalVisitorOgrayi from "./components/ledger_module/TotalVisitorOgrayi";
import ExpiredMedicineLists from "./components/StockModule/ExpiredMedicineLists";
import Return_medicine_list from "./components/return_medicine_module/Return_medcine_list";
import AddToPreviousCustomerAccount from "./components/AddToPreviousCustomerAccount";
import AddToPreviouseAccountList from "./components/AddToPreviouseAccountList";
import LedgerReciptPrevious from "./components/ledger_module/LedgerReciptPrevious";
import OgrayiReciptPre from "./components/OgrayiReciptPre";
import SalesByVisitor from "./components/sales_module/SalesByVisitor";
import SalesByMedicine from "./components/sales_module/SalesByMedicine";
import SalesByCustomer from "./components/sales_module/SalesByCustomer";
import OgrayiReciptListForPrint from "./components/customer_previous_module/OgrayiReciptListForPrint";
import CustomerInvoiceListForPrint from "./components/customer_module/CustomerInvoiceListForPrint";
import InvoicesWithProfit from "./components/finance_module/InvoicesWithProfit";
import SalesByProvinceMedicine from "./components/sales_module/SalesByProvinceMedicine";
import CustomerByProvinceSales from "./components/sales_module/CustomerByProvinceSales";
import ProvinceCustomerInvoiceWithProfit from "./components/sales_module/ProvinceCutomerInvoiceWithProfit";
import AddSalePriceForMedicine from "./components/medicine_module/AddSalePriceForMedicine";
import AddInvoiceForProvince from "./components/province_module/AddInvoiceForProvince";
import InvoiceListOfProvince from "./components/province_module/InvoiceListOfProvince";
import AddNewProvince from "./components/province_module/AddNewProvince";
import ProvinceList from "./components/province_module/ProvinceList";
import ProvinceMedicineSellList from "./components/province_module/ProvinceMedicineSellList";
import AddNewCustomer from "./components/customer_module/AddNewCustomer";
function App() {
  return (
    <>
    <Route exact path="/" component={Index} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/addnewmedicine" component={AddNewMedicine} />
    <Route exact path="/addtopreviousmedicine" component={AddToPreviousMedicine} />
    <Route exact path="/addvisitor" component={AddVisitor} />
    <Route exact path="/visitorlist" component={VisitorList} />
    <Route exact path="/addnewinvoice" component={AddNewInvoice} />
    <Route exact path="/AddNewCustomerInvoice" component={AddNewCustomerInvoice} />
    <Route exact path="/customerList" component={CustomerList} />
    <Route exact path="/stockRoomView" component={StockRoomView} />
    <Route exact path="/addtoloosestock" component={AddToLooseStock} />
    <Route exact path="/looseStockList" component={LooseStockList} />
    <Route exact path="/invoiceList" component={InvoiceList} />{" "}
    <Route exact path="/sampleDistribution" component={SampleDistribution} />
    <Route exact path="/sampleDistributionList" component={SampleDistributionList}/>
    <Route exact path="/addtopreviousinvoice" component={AddPreviousCustomerInvoice}/>
    <Route exact path="/visitorsellinformation/:visitorId" component={VisitorSellInformation}/>
    <Route exact path="/ledger" component={Ledger} />
    <Route exact path="/ledgerRecipt" component={LedgerReciptAdd} />
    <Route exact path="/ledgerReciptList" component={LedgerReciptList} />
    <Route exact path="/addExpense" component={AddExpense}  />
    <Route exact path="/expenseList" component={ExpenseList}  />
    <Route exact path="/financePage"  component={FinancePage} />
    <Route exact path="/calculateperday" component={CalculatePerDay} />
    <Route exact path="/calculatepermonth" component={CalculatePerMonth} />
    <Route exact path="/calculateperyear" component={CalculatePerYear} />
    <Route exact path="/users" component={Users} />
    <Route exact path="/backup" component={Backup} />
    <Route exact path="/addsuplier" component={AddSupplier} />
    <Route exact path="/totalcustomerograyi" component={TotalCustomerOgrayi} />
    <Route exact path="/totalvisitorograyi" component={TotalVisitorOgrayi} />
    <Route exact path="/expiredmedicinelist" component={ExpiredMedicineLists} />
    <Route exact path="/returnmedicinelist" component={Return_medicine_list} />
    <Route exact path="/addtopreviousaccount" component={AddToPreviousCustomerAccount} />
    <Route exact path="/addtopreviousaccountlist" component={AddToPreviouseAccountList} />
    <Route exact path="/ledgerreciptprevious" component={LedgerReciptPrevious} />
    <Route exact path="/ograyireciptlist" component={OgrayiReciptPre} />
    <Route exact path="/salebyvisitor" component={SalesByVisitor} />
    <Route exact path="/salebycustomer" component={SalesByCustomer} />
    <Route exact path="/salebymedicine" component={SalesByMedicine} />
    <Route exact path="/ograyiReciptListForPrintPrevious" component={OgrayiReciptListForPrint} />
    <Route exact path="/customerInvoicelistforprint" component={CustomerInvoiceListForPrint} />
    <Route exact path="/invoicewithprofit" component={InvoicesWithProfit} />
    <Route exact path="/salesbyprovincemedicine" component={SalesByProvinceMedicine} />
    <Route exact path="/customerbyprovincesales" component={CustomerByProvinceSales} />
    <Route exact path="/provinceinvoicewithprofit" component={ProvinceCustomerInvoiceWithProfit} />
    <Route exact path="/addsalepriceformedicine" component={AddSalePriceForMedicine} />
    
    <Route exact path="/addinvoiceforprovince" component={AddInvoiceForProvince} />
    <Route exact path="/invoicelistofprovince" component={InvoiceListOfProvince} />
    <Route exact path="/addnewprovince" component={AddNewProvince} />
    <Route exact path="/provincelist" component={ProvinceList} />
    <Route exact path="/provincemedicineselllist" component={ProvinceMedicineSellList} />
    
    <Route exact path="/addnewcustomer" component={AddNewCustomer} />
    
    
    
  </> 
  );
}

export default App;
