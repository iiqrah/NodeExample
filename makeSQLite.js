var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/dev.db');

function run() {
//
//
//WIPE TABLES
//
//
    db.run('DROP TABLE IF EXISTS WeaponTypes;');
    db.run('DROP TABLE IF EXISTS PrimaryWeapons;');
    db.run('DROP TABLE IF EXISTS SecondaryWeapons;');
    db.run('DROP TABLE IF EXISTS MeleeWeapon;s');
    db.run('DROP TABLE IF EXISTS Cards;');
    console.log("Wiped database")

//
//
//Create tables
//
//

    db.run('CREATE TABLE IF NOT EXISTS WeaponTypes (' +
           'TypeID integer PRIMARY KEY,' +
           'TypeName varchar(30)' +
           ');', 
           function (err) {
                if (err) console.log("Error reported: " + err);
           })

    db.run('CREATE TABLE IF NOT EXISTS PrimaryWeapons (' +
           'WeaponID varchar(3) PRIMARY KEY,' +
           'WeaponName varchar(25),' +
           'TypeID integer,' +
           'FOREIGN KEY (TypeID) REFERENCES WeaponTypes (TypeID));', 
           function (err) {
             if (err) console.log("Error reported: " + err);
        })

    db.run('CREATE TABLE IF NOT EXISTS SecondaryWeapons (' +
           'WeaponID integer PRIMARY KEY,' +
           'WeaponName varchar(25));', 
           function (err) {
            if (err) console.log("Error reported: " + err);
            })

    db.run('CREATE TABLE IF NOT EXISTS MeleeWeapons (' +
           'WeaponID integer PRIMARY KEY,' +
           'WeaponName varchar(25));', 
           function (err) {
            if (err) console.log("Error reported: " + err);
        }
    )

    db.run('CREATE TABLE IF NOT EXISTS Mercs (' +
           'MercID integer PRIMARY KEY,' +
           'Name varchar(20),' +
           'MercGroup varchar(20),' +
           'HP integer,' +
           'Speed integer);', 
           function (err) {
             if (err) console.log("Error reported: " + err);
        }
    )

    db.run('CREATE TABLE IF NOT EXISTS Cards (' +
           'Slot1 varchar(3),' +
           'Slot2 integer,' +
           'Slot3 integer,' +
           'Generation integer,' +
           'MercID integer,'+
           'FOREIGN KEY (Slot1) REFERENCES PrimaryWeapons (WeaponID),'+
           'FOREIGN KEY (Slot2) REFERENCES SecondaryWeapons(WeaponID),'+
           'FOREIGN KEY (Slot3) REFERENCES MeleeWeapons (WeaponID),'+
           'FOREIGN KEY (MercID) REFERENCES Mercs(MercID),'+
           'PRIMARY KEY (Slot1, Slot2, Slot3, Generation, MercID));'
           , function (err) {
             if (err) console.log("Error reported: " + err);
        })
          console.log("Tables created")

//
//
//Insert data
//
//

    db.run('INSERT INTO WeaponTypes (\"TypeID\", \"TypeName\")' +
           'VALUES' +
           '(1, \"Assault Rifle\"),' +
           '(2, \"LMG\"),' +
           '(3, \"Burst Rifle\"),' +
           '(4, \"SMG\"),' +
           '(5, \"Shotgun\"),' +
           '(6, \"Rifle & Sniper\");' , 
           function (err) {
            if (err) console.log("Error 1: " + err);
       })

    db.run('INSERT INTO PrimaryWeapons (\"WeaponID\",\"WeaponName\", \"TypeID\")' +
           'VALUES' +
           '( \"HU\", \"Hurtsall 2K\", 1),' +
           '( \"M\", \"M4A1\", 1),' +
           '( \"SH\", \"SHAR-C\", 1),' +
           '( \"T\", \"Timik-47\", 1),' +

           '( \"K\", \"K-121\", 2),' +
           '( \"MA\", \"MK46\", 2),' +

           '( \"B\", \"BR-16\", 3),' +
           '( \"S\", \"Stark AR\", 3),' +

           '( \"BL\", \"Blishlok\", 4),' +
           '( \"CR\", \"Crotzni\", 4),' +
           '( \"KE\", \"Hochfir\", 4),' +
           '( \"C\", \"KEK-10\", 4),' +
           '( \"SM\", \"SMG-9\", 4),' +

           '( \"A\", \"Ahnuhld-12\", 5),' +
           '( \"H\", \"Hollunds 880\", 5),' +
           '( \"R\", \"Remburg 7\", 5),' +

           '( \"D\", \"Dreiss AR\", 6),' +
           '( \"G\", \"Grandeur SR\", 6),' +
           '( \"P\", \"PDP-70\", 6),' +
           '( \"F\", \"Fel-ix\", 6),' +
           '( \"MO\", \"MOA SNPR-1\", 6);'  , 
           function (err) {
            if (err) console.log("Error reported: " + err);
       })

    //Note: The M9 and the Ryburn MP both use 4 for
    //      weapon card codes. In the database the ryburn is 99
    //      (Since the next pistol might use 12, and 99 
    //      is easy to recognise for when an exception is written for it)
    db.run('INSERT INTO SecondaryWeapons (\"WeaponID\", \"WeaponName\")' +
           'VALUES' +
           '(1, \"MP400\",)' +
           '(2, \"Tolen MP\")' +
           '(3, \"Empire-9\")' +
           '(4, \"M9\")' +
           '(5, \"DE .50\")' +
           '(6, \"Simeon .357\")' +
           '(7, \"Caulden\")' +
           '(8, \"Selbstadt .40\")' +
           '(9, \"Smjüth & Whetsman .40\")' +
           '(10, \"Hoigat .224\")' +
           '(11, \"Arevarov 9\")' +
           '(99, \"Ryburn MP\");'  , 
           function (err) {
            if (err) console.log("Error reported: " + err);
       })

    //Note: The Tactical Combat Axe and the Stun Batons both use 6 for
    //      weapon card codes. In the database the Stun Batons are 99
    //      (For the same reason as the ryburn)
    db.run('INSERT INTO MeleeWeapons (\"WeaponID\", \"WeaponName\")' +
           'VALUES' +
           '(1, \"Beckhill Combat Knife\"),' +
           '(2, \"Stilnotto Stiletto\"),' +
           '(3, \"Cricket Bat\"),' +
           '(4, \"Katana\"),' +
           '(5, \"Kukri\"),' +
           '(6, \"Tactical Combat Axe\"),' +
           '(7, \"Ulu\"),' +
           '(99, \"Stun Batons\");'  , 
           function (err) {
            if (err) console.log("Error reported: " + err);
       })

    db.run('INSERT INTO Mercs (\"MercID\", \"Name\", \"MercGroup\", \"HP\", \"Speed\")' +
           'VALUES' +
           '(1, \"Aura\", \"Medic\", 80, 470),' +
           '(2, \"Guardian\", \"Medic\", 110, 430),' +
           '(3, \"Phoenix\", \"Medic\", 100, 430),' +
           '(4, \"Sawbonez\", \"Medic\", 110, 410),' +
           '(5, \"Sparks\", \"Medic\", 80, 470),' +

           '(6, \"Bushwhacker\", \"Specialist\", 110, 410),' +
           '(7, \"Fletcher\", \"Specialist\", 110, 420),' +
           '(8, \"Proxy\", \"Specialist\", 90, 450),' +
           '(9, \"Turtle\", \"Specialist\", 110, 410),' +

           '(10, \"Arty\", \"Fire Support\", 120, 400),' +
           '(11, \"Javelin\", \"Fire Support\", 120, 400),' +
           '(12, \"Kira\", \"Fire Support\", 90, 440),' +
           '(13, \"Skyhammer\", \"Fire Support\", 120, 400),' +
           '(14, \"Stoker\", \"Fire Support\", 120, 400),' +

           '(15, \"Fragger\", \"Assault\", 130, 390),' +
           '(16, \"Nader\", \"Assault\", 120, 410),' +
           '(17, \"Rhino\", \"Assault\", 200, 360),' +
           '(18, \"Thunder\", \"Assault\", 160, 380),' +
           
           '(19, \"Aimee\", \"Recon\", 90, 440),' +
           '(20, \"Hunter\", \"Recon\", 110, 420),' +
           '(21, \"Phantom\", \"Recon\", 120, 410),' +
           '(22, \"Redeye\", \"Recon\", 120, 400),' +
           '(23, \"Vassili\", \"Recon\", 110, 420);'  , 
           function (err) {
            if (err) console.log("INSERT INTO MERCS " + err);
       })

           console.log("Basic data inserted")
}

run();
// setTimeout(insertBasicData, 1000);
