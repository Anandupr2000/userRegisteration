const { con } = require("./connection");

/**
 * helper fn for adding user data to database 
 * @param {*} param0 first name
 * @param {*} param1 last name
 * @param {*} param2 email name
 * @param {*} param3 age
 * @param {*} param4 phone number
 * @returns response containing message,err code
 */
var addUser = (fname, lname, email, age, phn) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (fname, lname, email, age, phone) VALUES (?, ?, ?, ?, ?)`;
        const values = [fname, lname, email, age, phn];
        let response = {
            'msg': '',
            success: true
        }
        con.query(sql, values, (err, result) => {
            if (err) {
                // creating response 
                response['success'] = false
                response['code'] = err.code
                response['msg'] = err.message

                if (err.code == 'ER_DUP_ENTRY') // changing message
                    response['msg'] = "Email id already registered"

                reject(response)// Reject the Promise with the error message
            } else {
                console.log("1 record inserted to user table");
                const response = {
                    'msg': 'User added successfully',
                    success: true
                };
                resolve(response); // Resolve the Promise with the response object
            }
        });
    });
}

/**
 * helper fn for adding address data to database 
 * @param {*} param0 address data in array format
 * @returns response containing message,err code 
 */
// (SELECT max(uid) FROM users),
var addAddress = ([email, block, street, city, state, country]) => {
    return new Promise((resolve, reject) => {
        let response = {
            'msg': '',
            success: true
        }
        var sql = `INSERT INTO address (uid,block,street,city,state,country) 
        VALUES (
            (SELECT uid FROM users WHERE email='${email}'),
            '${block}', '${street}','${city}','${state}','${country}')`;
        con.query(sql, function (err, result) {
            if (err) {
                // console.log(err.code);
                // console.log(err.message);
                response['msg'] = err.message
                response['code'] = err.code
                response['success'] = false
                resolve(response)
            }
            console.log("1 record inserted to address table");
            resolve(response)
        });
    })
}

/**
 * helper fn for registering user by formating data received 
 * @param {*} param0 user data received by server
 * @returns response containing message,err code 
 */
var registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let response = {}
        let [fname, lname, email, age, phnno] = [data['fname'], data['lname'], data['email'], parseInt(data['age']), parseInt(data['phnno'])]

        response = await addUser(fname, lname, email, age, phnno).catch(err => { return err })
        // console.log("returning response")

        if (response['success']) {
            let addressCount = parseInt(data['addressCount']);
            let addressFields = ['block', 'street', 'city', 'state', 'country']
            
            // fetching mutliple address and storing it to db
            let i = 0
            while (i++ < addressCount) {
                let address = [email]
                addressFields.forEach(field => {
                    address.push(data[field + i])
                })
                response = await addAddress(address).then(res => { return (res) }).catch(err => {
                    console.log(err)
                    reject(err)
                })
                resolve(response) // returning response
            }
        }
        else {
            console.log(response)
            resolve(response) // if user add is not success then return response
        }
    })
}
module.exports = { addAddress, addUser, registerUser } 