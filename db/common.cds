// namespace poapplication.common;
// using { Currency } from '@sap/cds/common';
// type size : String(50);
// aspect address{
//     dno :size; 
//     street: size;
//     landmark:size;
//     city:size;
//     postal:size;
//     state:size;
//     country:size;
//     region:size;
// }
// type Gender : String enum {
//     Male = 'M';
//     Female = 'F';
//     Other = 'O';

// };

// type AmountT : Decimal(10, 2)@(
//     Semantics.amount.currencyCode : 'CURRENCY_CODE',
//     sap.unit : 'CURRENCY_CODE'
// );

// aspect feeasp{
//     gross_fee : AmountT;
//     tax:AmountT;
//     total_fee: AmountT;
//     currency : Currency;
// }

namespace poapplication.common;

using { Currency } from '@sap/cds/common';

type Guid :UUID;
type PhoneNumber : String(31);
type Email : String(225);
type Role : String(2);
type String32 :String(32);
type String64 : String(64);
type String225 : String(225);
type String12: String(12);


Type Gender : String(1) enum {
    male ='M';
    female ='F';
    undisclosed ='D';
}

type AmountT : Decimal(10,2) @(
    Semantics.amount.currencyCode : 'CURRENCY_CODE',
    sap.unit : 'CURRENCY_CODE'
);

aspect Amount{
    GROSS_AMOUNT : AmountT;
    NET_AMOUNT : AmountT;
    TAX_AMOUNT : AmountT;
    CURRENCY : Currency;
}

aspect Address{
    STREET : String225;
    POSTAL_CODE : String12;
    CITY : String225;
    COUNTRY : String225;
    BUILDING : String225;
}