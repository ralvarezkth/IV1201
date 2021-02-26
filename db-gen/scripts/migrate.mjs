import config from "./migrate-config.mjs"
import {validate, transform, build, select, close} from "./migrate-util.mjs"



console.log("config")
console.log(config)


try {
    let all = [];
    let data = {};
    validate(config);
    let conf = build(config);

    for (let i = 0; i < conf.fetch.length; i++) {
        all.push(select(config, conf.fetch[i]));
        console.log("type", typeof(all[i]), all[i] instanceof Promise)
    }

    Promise.all(all).then(res => {
        console.log("resolved")
        for (let i = 0; i < conf.fetch.length; i++) {
            data[conf.fetch[i]] = res[0].rows;
        }

        console.log(data)
        console.log(conf)
        close();
    })


    console.log("last")
    transform(config);
    
} catch (e) {
    console.error(e.message)
    
}

