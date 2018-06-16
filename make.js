const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/db.json')
const db = low(adapter)

function wipe() {
    db
    .set("weaponTypes",[])
    .set("meleeWeapons",[])
    .set("primaryWeapons",[])
    .set("secondaryWeapons",[])
    .set("cards",[])
    .write();

    console.log('Database wiped');
}

function generate() {
    db.defaults(
        {
            meleeWeapons:[],
            primaryWeapons:[],
            secondaryWeapons:[],
            weaponTypes:[],
            cards:[]
        })
        .write();

    //
    //Weapon types
    //
    db.get("weaponTypes")
    .push("Assault Rifle")
    .push("LMG")
    .push("Burst Rifle")
    .push("SMG")
    .push("Shotgun")
    .push("Rifle & Sniper")
    .write();

    //
    //Melee weapons
    //
    db.get("meleeWeapons")
    .push("Beckhill Combat Knife")
    .push("Stilnotto Stiletto")
    .push("Cricket Bat")
    .push("Katana")
    .push("Kukri")

    //Both use 6 because splash damage can't use numbers
    .push("Tactical Combat Axe")
    .push("Stun Batons")

    .push("Ulu")
    .write();

    //
    //Secondary weapons
    //
    db.get("secondaryWeapons")
    .push("MP400")
    .push("Tolen MP")
    .push("Empire-9")

    //Both use 4 because splash damage can't use numbers
    .push("Ryburn MP")
    .push("M9")

    .push("DE .50") 
    .push("Simeon .357") 
    .push("Caulden")
    .push("Selbstadt .40")
    .push ("Smjüth & Whetsman .40")
    .push("Hoigat .224") 
    .push("Arevarov 9") 
    .write();



    //
    //Primary Weapons
    //
    db.get("primaryWeapons")
    .push({name: "Hurtsall 2K", id: "HU", type: 0})
    .push({name: "M4A1", id: "M", type: 0})
    .push({name: "SHAR-C", id: "SH", type: 0})
    .push({name: "Timik-47", id: "T", type: 0})

    .push({name: "K-121", id: "K", type: 1})
    .push({name: "MK46", id: "MA", type: 1})

    .push({name: "BR-16", id: "B", type: 2})
    .push({name: "Stark AR", id: "S", type: 2})

    .push({name: "Blishlok", id: "BL", type: 3})
    .push({name: "Crotzni", id: "CR", type: 3})
    .push({name: "Hochfir", id: "KE", type: 3})
    .push({name: "KEK-10", id: "C", type: 3})
    .push({name: "SMG-9", id: "SM", type: 3})

    .push({name: "Ahnuhld-12", id: "A", type: 4})
    .push({name: "Hollunds 880", id: "H", type: 4})
    .push({name: "Remburg 7", id: "R", type: 4})

    .push({name: "Dreiss AR", id: "D", type: 5})
    .push({name: "Grandeur SR", id: "G", type: 5})
    .push({name: "PDP-70", id: "P", type: 5})
    .push({name: "MOA SNPR-1", id: "MO", type: 5})
    .push({name: "Fel-ix", id: "F", type: 5})
    .write();

    db.get("cards")
    .push({
        name: "Sawbonez",
        cards: [
            {primary: "SM", secondary: 7, melee: 2, gen: 1},
            {primary: "SM", secondary: 8, melee: 2, gen: 1},
            {primary: "SM", secondary: 4, melee: 1, gen: 1},

            {primary: "CR", secondary: 7, melee: 3, gen: 1},
            {primary: "CR", secondary: 4, melee: 2, gen: 1},
            {primary: "CR", secondary: 8, melee: 1, gen: 1},

            {primary: "BL", secondary: 7, melee: 1, gen: 1},
            {primary: "BL", secondary: 4, melee: 3, gen: 1},
            {primary: "BL", secondary: 8, melee: 2, gen: 1},

            {primary: "SM", secondary: 7, melee: 2, gen: 2},
            {primary: "SM", secondary: 8, melee: 3, gen: 2},
            {primary: "SM", secondary: 4, melee: 1, gen: 2},

            {primary: "CR", secondary: 7, melee: 3, gen: 2},
            {primary: "CR", secondary: 4, melee: 2, gen: 2},
            {primary: "CR", secondary: 8, melee: 1, gen: 2},

            {primary: "BL", secondary: 7, melee: 1, gen: 2},
            {primary: "BL", secondary: 4, melee: 3, gen: 2},
            {primary: "BL", secondary: 8, melee: 2, gen: 2}
        ]
    })
    .write();

    console.log("Database generated")
}

wipe();

// call the rest of the code and have it execute after 3 seconds
setTimeout(generate, 100);
