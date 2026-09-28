module.exports = cds.service.impl(async function () {

    const { EmployeeSrv } = this.entities;
    const { ProductSrv } = this.entities;
    const { uuid, exists, isdir, read } = cds.utils;
    // Implementation of an action
    // There are 3 generic handlers
    // .before() : Pre-check and validation.
    // .on()     : Performing DB operations
    // .after()  : To save / close connections
this.before('UPDATE', 'EmployeeSrv', async (req) => {
    const salaryAmt = req.data.salaryAmount;

    if (salaryAmt > 100000) {
        req.error(500, 'Please get the approval from your line manager.');
    }
});

   

this.on('getHighestPriceProducts', async (req) => {
const tx = cds.tx(req);

const result = await tx.read(ProductSrv)
.orderBy({ PRICE: 'desc' })
.limit(10);
return result;

    
});
this.on('getHighestSalariedEmployees', async (req) => {
    try {

        console.log("Function called");

        const tx = cds.tx(req);

        const result = await tx.read(EmployeeSrv)
            .orderBy('salaryAmount desc')
            .limit(10);

        console.log(result);

        return result;

    } catch (error) {

        console.error("ERROR:", error);

        return req.error(500, error.message);
    }
});
this.on('IncreaseSal', EmployeeSrv, async (req) => {
    try {
        const tx = cds.tx(req);
 
        const { ID } = req.params[0]; // cuid entity key
 
        const employee = await tx.read(EmployeeSrv)
            .where({ ID });
 
        if (!employee.length) {
            return req.error(404, 'Employee not found');
        }
 
        const currentSalary = employee[0].salaryAmount;
        const updatedSalary = Number(currentSalary) * 1.15;
 
        await tx.update(EmployeeSrv)
            .set({
                salaryAmount: updatedSalary
            })
            .where({
                ID
            });
 
        return {
            message: 'Employee salary increased by 15%',
            oldSalary: currentSalary,
            newSalary: updatedSalary
        };
 
    } catch (error) {
        req.error(500, error.message);
    }
});
 


this.before('UPDATE', 'ProductSrv', async (req) => {
    const PRICE = req.data.PRICE;

    if (PRICE > 100000) {
        req.error(500, 'Please get the approval from your line manager.');
    }
});
this.before('UPDATE', 'PurchaseItemSrv', async (req) => {
    const GROSS_AMOUNT = req.data.GROSS_AMOUNT;
    const CURRENCY_code = req.data.CURRENCY_code;


    if (GROSS_AMOUNT > 15000 && CURRENCY_code=== 'USD') {
        req.error(500, 'Please get the approval from your line manager.');
    }
    if (GROSS_AMOUNT > 10000 && CURRENCY_code=== 'EUR') {
        req.error(500, 'Please get the approval from your line manager.');
    }
});
this.before('UPDATE', 'AddressSrv', async (req) => {
    const COUNTRY = req.data.COUNTRY;

    if (COUNTRY!=='GB' && COUNTRY!=='US') {
        req.error(500, 'Please get the approval from your line manager.');
    }
});

    this.on('createEmployee', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step-3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step-4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(EmployeeSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data;
            } else {
                request.error(500, "Erro r in inserting data into the database");
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString());
        });

        // Step-5 : Return the data
        return returnData;
    })
    
    const { AddressSrv } = this.entities;
    this.on('createAddress', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step-3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step-4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(AddressSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data;
            } else {
                request.error(500, "Error in inserting data into the database");
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString());
        });

        // Step-5 : Return the data
        return returnData;
    })
    this.on('updateEmployee', async (request) => {

    const {
        ID,
        salaryAmount,
        Currency_code
    } = request.data;

    try {

        const objTransaction = cds.tx(request);

        await objTransaction
            .update(EmployeeSrv)
            .with({
                salaryAmount,
                Currency_code
            })
            .where({ ID });

        return "Successfully updated";

    } catch (error) {

        console.error(error);
        request.error(500, error.message);

    }
});
this.on('updateAddress', async (request) => {

    const {
        NODE_KEY,
        LATITUDE
    } = request.data;

    try {

        const objTransaction = cds.tx(request);

        await objTransaction
            .update(AddressSrv)
            .with({
                LATITUDE
            })
            .where({ NODE_KEY });

        return "Successfully updated";

    } catch (error) {

        console.error(error);
        request.error(500, error.message);

    }
});

    this.on('createProduct', async (request, response) => {

        // Step-2 : Get the data which is coming from the API
        const empData = request.data;

        // Step-3 : Instantiate the transaction object
        const objTransaction = cds.tx(request);

        // Step-4 : Insert the record into database
        let returnData = await objTransaction.run(
            INSERT.into(ProductSrv).entries(empData)
        ).then((resolve, reject) => {

            if (typeof(resolve) !== undefined) {
                return request.data;
            } else {
                request.error(500, "Error in inserting data into the database");
            }

        }).catch(err => {
            request.error("There is an error : ", err.toString());
        });

        // Step-5 : Return the data
        return returnData;
    });
    this.on('deleteEmployee', async (request, response) => {
    const {
        ID
    } = request.data;

    try {
        const objTransaction = cds.tx(request);

        await objTransaction.delete(EmployeeSrv).where({
            ID: ID
        });

        return "Successfully deleted.";
    } catch (error) {
        request.error("Error : ", error);
    }
});

    this.on('getUtilities', async (request, response) => {
    let vUUID = uuid(),
        vPackageContent = null,
        vInput = "%EA%A4",
        uri,
        dirExists = false,
        isFileExists = false;

    // Exists
    if (exists('srv/request.http')) {
        isFileExists = true;
    }

    // Is directory exists or not
    if (isdir('app')) {
        dirExists = true;
    }

    // Decode URI
    try {
        uri = decodeURI(vInput);

        // Make Directory
        await mkdir('myLib');
    } catch {
        uri = vInput;
    }

    vPackageContent = await read('package.json');

    // Final Value
    var finalValue = {
        uuid: vUUID,
        uri: uri,
        isFileExists: isFileExists,
        dirExists: dirExists,
        packageInfo: vPackageContent
    };
    return finalValue;
    });
})