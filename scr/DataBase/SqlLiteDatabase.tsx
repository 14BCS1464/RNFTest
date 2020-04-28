import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);


const database_name = "testDataBase.db";
const database_version = "1.0";
const database_displayname = "SQLite DataBase";
const database_size = 200000;

export default class SqlLiteDataBase {

    //Intiate the DataBase
    initDB = (callback?: Function) => {
        let db;
        return new Promise((resolve: any) => {

            SQLite.echoTest()
                .then(() => {

                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    )
                        .then(DB => {
                            db = DB;

                            db.executeSql('SELECT 1 FROM UserDetails1 LIMIT 1').then((result: any) => {

                            }).catch((error) => {

                                db.transaction((tx) => {
                                    tx.executeSql('CREATE TABLE IF NOT EXISTS UserDetails1 (id,fullName, email, password, confrimPassword, phoneNumber,parentName,height,overallGPA, testScore)');
                                }).then((result) => {
                                    this.closeDatabase(db);
                                }).catch(error => {
                                    console.warn(error);
                                });
                            });

                            resolve(db);

                        })
                        .catch(error => {
                            console.warn(error);
                        });
                })
                .catch(error => {
                    console.warn("echoTest failed - plugin not functional");
                });
        });
    };


    // Add user To DB
    addUser = (user: any) => {
        console.warn(user)
        return new Promise((resolve) => {
            this.initDB().then((db) => {

                db.transaction((tx) => {

                    tx.executeSql('INSERT INTO UserDetails1 VALUES (?, ?,?, ?, ?, ?,?,?,?,?)', [user.id,
                    user.fullName, user.email, user.password, user.confrimPassword,
                    user.phoneNumber, user.parentName, user.height, user.overallGPA, user.testScore]).then(([tx, results]) => {
                        resolve(results);
                        console.warn("result" + JSON.stringify(results));
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                    console.warn("result" + result);

                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }



// For Log in the user User
    userLogIn = (email: any, password: any) => {
        console.warn(password)
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT * FROM UserDetails1 WHERE email='${email}'`, []).then(([tx, results]) => {
                        const len = results.rows.length;
                        if (!len) {
                            alert('This account does not exist!');
                        } else {
                            const row = results.rows.item(0);
                            if (password === row.password) {
                                console.warn(row.password)
                                resolve(row.id)

                            } else {
                                alert('Authentication failed!');
                            }
                        }

                    });

                }).then((result) => {
                    this.closeDatabase(db);
                    console.warn("result" + result);

                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }

    // get alll the user  from Data Base
    userData = () => {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT p.id, p.fullName,p.email,p.password,p.confrimPassword,p.phoneNumber,p.height,p.overallGPA,p.testScore FROM UserDetails1 p', []).then(([tx, results]) => {
                        console.warn("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            console.warn(`Prod ID: ${row.id}, Prod Name: ${row.email}`)


                        }

                        console.warn(results);
                        resolve(results.rows.item);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                    console.warn(result);
                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }


    //get user By ID
    userById = (id: number) => {
        console.warn(id);
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT * FROM UserDetails1 WHERE id = ${id}`).then(([tx, results]) => {

                        resolve(results.rows.item(0));


                    });
                }).then((result: any) => {
                    this.closeDatabase(db)
                }).catch((err: any) => {
                    console.warn(err);
                });
            }).catch((err: any) => {
                console.warn(err);
            });
        });
    }


    //Upadte user Details
    updateUser = (id: number, user: any) => {
        console.warn(JSON.stringify(id))
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql(`UPDATE UserDetails1 SET id = ?, fullName = ?, email = ?, password = ?, confrimPassword=?,phoneNumber=?,confrimPassword=?,parentName=?,height=?,overallGPA=?, testScore=? WHERE id = ${id}`, [id, user.fullName, user.email, user.password, user.confrimPassword, user.phoneNumber, user.parentName, user.height, user.overallGPA, user.testScore]).then(([tx, results]) => {
                        console.warn(results)
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.warn(err);
                });
            }).catch((err) => {
                console.warn(err);
            });
        });
    }

    //Close the DataBase after operation
    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {

                });
        } else {
            console.log("Database was not OPENED");
        }
    };
}
