/**
 * Map for the contents to be used with top-level application.
 */

export const contents = {menuhome: "", menulogin: "", menuregister: "", menuapply: "",
                    footercontent: "", hometitle: "", homecontent: "", registertitle: "",
                    registerbutton: "", logintitle: "", loginbutton: "", applytitle: "", applybutton: ""};

/**
 * Effect callback used to fetch linguistic content fragments to dynamically populate the application.
 * @param {string} langId id of languages to fetch data for.
 * @param {function} callback to update application content.
 */

export function effect(langId, setContent) {
        fetch('/content/' + langId).then(res => {
            res.json().then(data => {
                setContent(mapFragments(data[0]));
            });
        }).catch(err => { 
            console.log("err", err);
        });
}

function mapFragments(data) {
    let map = {};

    data.ContentFragments.forEach(entry => {
        map[entry.Fragment.name] = entry.value;
    });

    return map;
}