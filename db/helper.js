const { con } = require("./connection");

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
                // console.log(err.code);
                // console.log(err.message);
                response['success'] = false
                response['code'] = err.code
                response['msg'] = err.message
                if (err.code = 'ER_DUP_ENTRY')
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
var registerUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let response = {}
        let [fname, lname, email, age, phnno] = [data['fname'], data['lname'], data['email'], parseInt(data['age']), parseInt(data['phnno'])]
        response = await addUser(fname, lname, email, age, phnno)
            // .catch(err=>{return err.code}))
            // .then((res) => {
            //     response = res
            // })
            .catch(err => {
                // console.log(err)
                return err
            })
        console.log("returning response")

        if (response['success']) {
            let addressCount = parseInt(data['addressCount']);
            let addressFields = ['block', 'street', 'city', 'state', 'country']
            let i = 0
            while (i++ < addressCount) {
                let address = [email]
                addressFields.forEach(field => {
                    // console.log(field)
                    // console.log(`${field}` + i)
                    address.push(data[field + i])
                })
                response = await addAddress(address).then(res => { return (res) }).catch(err => {
                    console.log(err)
                    reject(err)
                })
                resolve(response)
                // console.log(address)
            }
        }
        else {
            console.log(response)
            resolve(response) // if user add is not success then return response
        }
        // console.log(response)
        // console.log(fname, lname, email, age, phnno, block, street, city, state, country)
    })
}
module.exports = { addAddress, addUser, registerUser } 