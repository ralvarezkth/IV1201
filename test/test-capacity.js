const needle = require('needle');

const num = process.argv.length > 2 ? process.argv[2] : 100;
let userReg = [];
let appFetch = [];
let userAll = [];
let appAll = [];

for (let i = 0; i < 5; i++) {
    userReg.push([]);
    appFetch.push([]);

    for (let j = 0; j < num; j++) {
        let fname = scrambleFname(i, j);
        let lname = scrambleLname(i, j);
        let email = "fname" + i + j + "@test.com";
        let ssn = scrambleSsn();
        let uname = "user" + i + j;
        let passwd = "passwd" + i + j;
        userReg[i].push({newUser: {firstName: fname, lastName: lname, email: email, ssn: ssn, username: uname, password: passwd}});
        appFetch[i].push(scrambleAppId());
        scrambleFname(i);
    }
}

// bench().registerUser(userReg).wait();
bench().fetchApplication(appFetch).wait();


function scrambleFname(outer, num) {
    let char = [["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], 
        ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
        ["ab", "bc", "cd", "de", "ef", "fg", "gh", "hi", "ij", "jk"],
        ["kl", "lm", "mn", "no", "op", "pq", "qr", "rs", "st", "tu"],
        ["ac", "bd", "ce", "df", "eg", "fh", "gi", "hj", "ik", "jl"]];
    let no = Math.floor(num / 10) + 1;
    let ind = num % 10;
    let name = "fname";

    for (let i = 0; i < no; i++) {
        name += char[outer][ind];
    }
    
    return name;
}

function scrambleLname(num) {
    let char = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    let no = Math.floor(num / 10) + 1;
    let ind = num % 10;
    let name = "lname";

    for (let i = 0; i < no; i++) {
        name += char[ind];
    }
    
    return name;
}

function scrambleSsn() {
    let ssn = "";

    for (let i = 0; i < 2; i++) {
        ssn += Math.floor(Math.random() * 10);
    }

    ssn += "0909-";

    for (let i = 0; i < 4; i++) {
        ssn += Math.floor(Math.random() * 10);
    }

    return ssn;
}

function scrambleAppId() {
    return Math.floor(Math.random() * 3) + 1;
}

function bench() {
    return {
        i: 0,
        j: 0,
        startTime: (new Date()).getTime(),
        registerUser: function(users) {
            this.type = "user";
            this.iterations = users.length;
            this.total = users[0].length;
            this.data = users;

            for (let i = 0; i < this.total; i++) {
                userAll.push(needle("post", "http://localhost:3001/register", users[this.i][i], {json: true}));
            }

            return this;
        },
        fetchApplication: function(apps) {
            this.type = "app";
            this.iterations = apps.length;
            this.total = apps[0].length;
            this.data = apps;

            for (let i = 0; i < this.total; i++) {
                userAll.push(needle("get", "http://localhost:3001/admin/" + apps[this.j][i]));
            }

            return this;
        },
        wait: function() {
            let all = this.type === "user" ? Promise.all(userAll) : Promise.all(appAll);

            all.then(yup => {
                console.log("Benched " + this.total + " requests in a total of " + ((new Date()).getTime() - this.startTime) + " ms.");
            }).then(() => {
                if (++this.i < this.iterations) {
                    userAll = [];
                    appAll = [];
                    this.startTime = (new Date()).getTime();

                    if (this.type === "user") {
                        this.registerUser(this.data);
                    } else {
                        this.fetchApplication(this.data);
                    }

                    this.wait();
                }
            });            
        }
    }
}

needle("get", "http://localhost:3001/content");
// needle("post", "http://localhost:3001/register", userReg[5], {json: true})