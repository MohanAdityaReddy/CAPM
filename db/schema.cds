// namespace poapplication;
// using {poapplication.common as common } from'./common';
// using {Country, Currency} from '@sap/cds/common';
// using {managed, temporal} from '@sap/cds/common';
// entity Students: common.address,common.feeasp,temporal,managed{
//     key studentId : Integer;
//     studentName : String(50);
//     gender: common.Gender;
//     fatherName : String(50);
//     motherName : String(50);
//     contactNo : String(14);
//     fee : Decimal;
//     currency: Currency;
//     book : Association to many Books on book.parent = $self ;
//     mark : Association to many Marks on mark.parent1 = $self;
    
// }
// entity Classes{
//     key classId : Integer;
//     className : String(50);
//     teacherName : String(50);
// }

// type size: String(50);
// entity Books{
//     key BookId: Int16;
//     parent : Association to  Students;
//     studentName: size;
//     bookauthor:size;
//     price: Int16;
//     doi: Date;
//     dor: Date;
// }

// entity Marks{
//     key StudentId : Int32;
//     parent1 : Association to  Students;
//     total : Int16;
//     subject : size;
// }



// entity Employees{
//     key employeeId : Integer;
//     employeeName : String(50);
//     salary : Integer;
//     department : String(50);
//     currencyCode : String(50);
//     city : String(50);
//     country: Country;
//     division: Association to Divisions;

// }
// entity Divisions{
//     key divisionId : Integer;
//     divisionName : String(50);
//     city: String(50);
//     country : String(50);

// }

// // type ![EmployeeName] : String(50);
// //type nameStr :String(50); coustom reusable type  we can use nameStr in place of String(50)

namespace poapplication.db;
 using {cuid, Currency} from '@sap/cds/common';
 using {poapplication.common as common } from './common';

 context master {
    entity BusinessPartners{
        key Node_KEY : common.Guid;
        BP_ROLE : common.Role;
        EMAIL : common.Email;
        MOBILE : common.PhoneNumber;
        FAX : common.String32;
        WEB : common.String225;
        BP_ID : common.Guid;
        COMPANY_NAME : common.String225;
        AD : Association to Addresses;


    }
    entity Addresses : common.Address {
        key NODE_KEY : common.Guid;
        ADDRESS_TYPE : common.String32;
        VAL_START : Date;
        VAL_END : Date;
        LATITUDE : Decimal;
        LONGITUDE : Decimal;
 
        BP : Association to one BusinessPartners on BP.AD = $self;
    }
 
    entity Products {
        key NODE_KEY : common.Guid;
        PRODUCT_ID : common.String32;
        TYPE_CODE : String(2);
        CATEGORY : common.String32;
        DESCRIPTION : String(225);
        TAX_TARRIF_CODE : Integer;
        MEASURE_UNIT : String(2);
        WEIGHT_MEASURE : Decimal(5, 2);
        WEIGHT_UNIT : String(2);
        PRICE : Decimal (15, 2);
        CURRENCY_CODE : String(5);
        WIDTH : Decimal(5, 2);
        DEPTH : Decimal(5, 2);
        HEIGHT : Decimal(5, 2);
        DIM_UINT : String(2);
 
        SUPPLIERS : Association to BusinessPartners;
    }
    entity Employees : cuid {
        nameFirst : common.String64;
        nameLast : common.String64;
        nameInitials : common.String64;
        nameMiddle : common.String64;
        gender : common.Gender;
        language : String(2);
        loginName : String(16);
        phoneNumber : common.PhoneNumber;
        email : common.Email;
        Currency : Currency;
        salaryAmount : common.AmountT;
        accountAmount : common.String32;
        bankId : String(16);
        bankName : common.String64;
    }
}
 
context transaction {
    entity PurchaseOrders : common.Amount {
        key NODE_KEY : common.Guid;
        PO_ID : common.Guid;
 
        PARTNER : Association to master.BusinessPartners;
        LIFECYCLE_STATUS : String(1);
        OVERALL_STATUS : String(1);
 
        Items : Association to many PurchaseItems on Items.PARENT = $self;
    }
    entity PurchaseItems : common.Amount {
        key NODE_KEY : common.Guid;
 
        PARENT : Association to PurchaseOrders;
 
        PO_ITEMS_POS : Integer;
 
        PRODUCT : Association to master.Products;
    }    
}
 
