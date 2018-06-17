require "sqlite3"
db = SQLite3::Database.new "db/dev.db"

def wipe(db)
    File.open('db/dev.db', 'w') {|file| file.truncate(0) }
    puts("Wiped database")
end

def create_tables(db)
    db.execute("CREATE TABLE IF NOT EXISTS WeaponTypes (" +
        "TypeID integer PRIMARY KEY," +
        "TypeName varchar(30)" +
        ");")

 db.execute("CREATE TABLE IF NOT EXISTS PrimaryWeapons (" +
        "WeaponID varchar(3) PRIMARY KEY," +
        "WeaponName varchar(25)," +
        "TypeID integer," +
        "FOREIGN KEY (TypeID) REFERENCES WeaponTypes (TypeID));")

 db.execute("CREATE TABLE IF NOT EXISTS SecondaryWeapons (" +
        "WeaponID integer PRIMARY KEY," +
        "WeaponName varchar(25));")

 db.execute("CREATE TABLE IF NOT EXISTS MeleeWeapons (" +
        "WeaponID integer PRIMARY KEY," +
        "WeaponName varchar(25));")

 db.execute("CREATE TABLE IF NOT EXISTS Mercs (" +
        "MercID integer PRIMARY KEY," +
        "Name varchar(20), " +
        "MercRole varchar(20)," +
        "HP integer," +
        "Speed integer);")

 db.execute("CREATE TABLE IF NOT EXISTS Cards (" +
        "Slot1 varchar(3)," +
        "Slot2 integer," +
        "Slot3 integer," +
        "Generation integer," +
        "MercID integer,"+
        "Augment1 integer,"+
        "Augment2 integer,"+
        "Augment3 integer,"+
        "FOREIGN KEY (Slot1) REFERENCES PrimaryWeapons (WeaponID),"+
        "FOREIGN KEY (Slot2) REFERENCES SecondaryWeapons(WeaponID),"+
        "FOREIGN KEY (Slot3) REFERENCES MeleeWeapons (WeaponID),"+
        "FOREIGN KEY (MercID) REFERENCES Mercs(MercID),"+
        "FOREIGN KEY (Augment1) REFERENCES Augments(AugmentID)," +
        "FOREIGN KEY (Augment2) REFERENCES Augments(AugmentID)," +
        "FOREIGN KEY (Augment3) REFERENCES Augments(AugmentID)," +
        "PRIMARY KEY (Slot1, Slot2, Slot3, Generation, MercID));"
        )

db.execute("CREATE TABLE IF NOT EXISTS Augments1 (" +
        "AugmentID integer PRIMARY KEY," +
        "Name varchar(15)," +
        "Description varchar(60));"
)

db.execute("CREATE TABLE IF NOT EXISTS Augments2 (" +
    "AugmentID integer PRIMARY KEY," +
    "Name varchar(15)," +
    "Description varchar(60));"
)
db.execute("CREATE TABLE IF NOT EXISTS Augments3 (" +
"AugmentID integer PRIMARY KEY," +
"Name varchar(15)," +
"Description varchar(60));"
)
       puts("Tables created")
end

def insert_data(db)

    db.execute("INSERT INTO WeaponTypes (\"TypeID\", \"TypeName\")" +
            "VALUES" +
            "(1, \"Assault Rifle\")," +
            "(2, \"LMG\")," +
            "(3, \"Burst Rifle\")," +
            "(4, \"SMG\")," +
            "(5, \"Shotgun\")," +
            "(6, \"Rifle & Sniper\");")

    db.execute("INSERT INTO PrimaryWeapons (\"WeaponID\",\"WeaponName\", \"TypeID\")" +
           "VALUES" +
           "( \"HU\", \"Hurtsall 2K\", 1)," +
           "( \"M\", \"M4A1\", 1)," +
           "( \"SH\", \"SHAR-C\", 1)," +
           "( \"T\", \"Timik-47\", 1)," +

           "( \"K\", \"K-121\", 2)," +
           "( \"MA\", \"MK46\", 2)," +

           "( \"B\", \"BR-16\", 3)," +
           "( \"S\", \"Stark AR\", 3)," +

           "( \"BL\", \"Blishlok\", 4)," +
           "( \"CR\", \"Crotzni\", 4)," +
           "( \"KE\", \"Hochfir\", 4)," +
           "( \"C\", \"KEK-10\", 4)," +
           "( \"SM\", \"SMG-9\", 4)," +

           "( \"A\", \"Ahnuhld-12\", 5)," +
           "( \"H\", \"Hollunds 880\", 5)," +
           "( \"R\", \"Remburg 7\", 5)," +

           "( \"D\", \"Dreiss AR\", 6)," +
           "( \"G\", \"Grandeur SR\", 6)," +
           "( \"P\", \"PDP-70\", 6)," +
           "( \"F\", \"Fel-ix\", 6)," +
           "( \"MO\", \"MOA SNPR-1\", 6);")

    # Note: The M9 and the Ryburn MP both use 4 for
    #       weapon card codes. In the database the ryburn is 99
    #       (Since the next pistol might use 12, and 99 
    #       is easy to recognise for when an exception is written for it)
    db.execute("INSERT INTO SecondaryWeapons (\"WeaponID\", \"WeaponName\")" +
           "VALUES" +
           "(1, \"MP400\")," +
           "(2, \"Tolen MP\")," +
           "(3, \"Empire-9\")," +
           "(4, \"M9\")," +
           "(5, \"DE .50\")," +
           "(6, \"Simeon .357\")," +
           "(7, \"Caulden\")," +
           "(8, \"Selbstadt .40\")," +
           "(9, \"Smjüth & Whetsman .40\")," +
           "(10, \"Hoigat .224\")," +
           "(11, \"Arevarov 9\")," +
           "(99, \"Ryburn MP\");")

    # Note: The Tactical Combat Axe and the Stun Batons both use 6 for
    #       weapon card codes. In the database the Stun Batons are 99
    #       (For the same reason as the ryburn)
    db.execute("INSERT INTO MeleeWeapons (\"WeaponID\", \"WeaponName\")" +
           "VALUES" +
           "(1, \"Beckhill Combat Knife\")," +
           "(2, \"Stilnotto Stiletto\")," +
           "(3, \"Cricket Bat\")," +
           "(4, \"Katana\")," +
           "(5, \"Kukri\")," +
           "(6, \"Tactical Combat Axe\")," +
           "(7, \"Ulu\")," +
           "(99, \"Stun Batons\");")

    db.execute("INSERT INTO Mercs (\"MercID\", \"Name\", \"MercRole\", \"HP\", \"Speed\")" +
           "VALUES" +
           "(1, \"Aura\", \"Medic\", 80, 470)," +
           "(2, \"Guardian\", \"Medic\", 110, 430)," +
           "(3, \"Phoenix\", \"Medic\", 100, 430)," +
           "(4, \"Sawbonez\", \"Medic\", 110, 410)," +
           "(5, \"Sparks\", \"Medic\", 80, 470)," +

           "(6, \"Bushwhacker\", \"Specialist\", 110, 410)," +
           "(7, \"Fletcher\", \"Specialist\", 110, 420)," +
           "(8, \"Proxy\", \"Specialist\", 90, 450)," +
           "(9, \"Turtle\", \"Specialist\", 110, 410)," +

           "(10, \"Arty\", \"Fire Support\", 120, 400)," +
           "(11, \"Javelin\", \"Fire Support\", 120, 400)," +
           "(12, \"Kira\", \"Fire Support\", 90, 440)," +
           "(13, \"Skyhammer\", \"Fire Support\", 120, 400)," +
           "(14, \"Stoker\", \"Fire Support\", 120, 400)," +

           "(15, \"Fragger\", \"Assault\", 130, 390)," +
           "(16, \"Nader\", \"Assault\", 120, 410)," +
           "(17, \"Rhino\", \"Assault\", 200, 360)," +
           "(18, \"Thunder\", \"Assault\", 160, 380)," +
           
           "(19, \"Aimee\", \"Recon\", 90, 440)," +
           "(20, \"Hunter\", \"Recon\", 110, 420)," +
           "(21, \"Phantom\", \"Recon\", 120, 410)," +
           "(22, \"Redeye\", \"Recon\", 120, 400)," +
           "(23, \"Vassili\", \"Recon\", 110, 420);")

    db.execute("INSERT INTO Augments1 (\"AugmentID\", \"Name\", \"Description\")" +
               "VALUES" + 
               "(1, \"Ammo Reach\", \"25% increase to ammo station radius\")," +
               "(2, \"Big Ears \", \"Enemy footsteps and other appropriate noises are 50% \")," +
               "(3, \"Bigger Blast\", \"10% increase to blast radius to AoE weapons. \")," +
               "(4, \"Bomb Squad \", \"Makes enemy deployables, such as Proxmity Mines, more visible. \")," +
               "(5, \"Chopper\", \"15% increase to melee damage.\")," +
               "(6, \"Cool\", \"Doubles the time it takes Mounted MGs to overheat.\")," +
               "(7, \"Double Time\", \"Allows you to reload whilst sprinting\")," +
               "(8, \"Drilled\", \"20% reduction to reload time\")," +
               "(9, \"Enigma\", \"Reduced duration of being spotted by 60%.\")," +
               "(10, \"Explodydendron\", \"10% increase to blast radius to AoE abilities\")," +
               "(11, \"Extra Ammo\", \"Increase the max number of ammo packs by one\")," +
               "(12, \"Extra Supplies\", \"20% cooldown reduction to support abilities\")," +
               "(13, \"Extender\", \"Extends the size of the shield by 25% on turtle and 20% on guardian\")," +
               "(14, \"Fail Safe\", \"Reduces the effect taken from your own explosives by 30%\")," +
               "(15, \"Flying Pig\", \"Increases Long Jump distance by 10% and removes falling damage\")," +
               "(16, \"Focus\", \"Reduces Flinching when hit while iron sighting or scoped by 30%\")," +
               "(17, \"Get up\", \"30% increase to health given on revive\")," +
               "(18, \"Guardian Angel\", \"Receive an audio warning whenever a nearby enemy air support is a danger to you and 20% reduced damage from air support abilities\")," +
               "(19, \"Healing Reach\", \"15% increase to size of healing radius\")," +
               "(20, \"Ice Cold\", \"40% increase in time until overheating\")," +
               "(21, \"Lock on\", \"Turrets, Mines and other automated defences react 30% more quickly\")," +
               "(22, \"Looter\", \"Killing an enemy Fire Support Merc will drop a small Ammo Pack, killing an enemy Medic will drop a small Health Pack\")," +
               "(23, \"Mechanic\", \"Improves any repair tools and disarm rates by 20%\")," +
               "(24, \"Nitros\", \"50% increase to barrel acceleration\")," +
               "(25, \"Pineapple Juggler\", \"Allows you to melee hit back mid-air grenades and other projectiles\")," +
               "(26, \"Potent Packs\", \"20% increase to health regen rate given by healing abilities\")," +
               "(27, \"Quick Draw\", \"30% faster weapon/item switching\")," +
               "(28, \"Quick Charge\", \"10% increase to round charge rate\")," +
               "(29, \"Quick Eye\", \"35% faster movement speed and raise/lower times when Iron Sighting\")," +
               "(30, \"Quick Slash\", \"Increases melee slash speed by 15%\")," +
               "(31, \"Recharge\", \"10% reduction to ability cooldown\")," +
               "(32, \"Sneaky\", \"Reduces the amount of sound you generate when running by 50%\")," +
               "(33, \"Spares\", \"Increases the maximum number of magazines that can be carried by 1\")," +
               "(34, \"Spotter\", \"20% increase to the detection radius\")," +
               "(35, \"Springy\", \"Reduces jumping and Long Jump penalties by 35%\")," +
               "(36, \"Steady\", \"22% Increase to deployables health\")," +
               "(37, \"Tough\", \"Reduces the delay untill health regen starts by 66%\")," +
               "(38, \"Try Hard\", \"Gain 10HP for each death you suffer without getting a kill, up to a maximum of 30HP\")," +
               "(39, \"Undercover\", \"10% increase to ability duration\")," +
               "(40, \"Unshakeable\", \"Reduces the damage you take from explosives by 15%\")," +
               "(41, \"Untrackable\", \"Turrets, Mines and other automated defenses react 35% more slowly to your presence\")"
               
        )

        db.execute("INSERT INTO Augments2 (\"AugmentID\", \"Name\", \"Description\")" +
               "VALUES" + 
               "(1, \"Ammo Reach\", \"25% increase to ammo station radius\")," +
               "(2, \"Big Ears \", \"Enemy footsteps and other appropriate noises are 50% \")," +
               "(3, \"Bigger Blast\", \"10% increase to blast radius to AoE weapons. \")," +
               "(4, \"Bomb Squad \", \"Makes enemy deployables, such as Proxmity Mines, more visible. \")," +
               "(5, \"Chopper\", \"15% increase to melee damage.\")," +
               "(6, \"Cool\", \"Doubles the time it takes Mounted MGs to overheat.\")," +
               "(7, \"Double Time\", \"Allows you to reload whilst sprinting\")," +
               "(8, \"Drilled\", \"20% reduction to reload time\")," +
               "(9, \"Enigma\", \"Reduced duration of being spotted by 60%.\")," +
               "(10, \"Explodydendron\", \"10% increase to blast radius to AoE abilities\")," +
               "(11, \"Extra Ammo\", \"Increase the max number of ammo packs by one\")," +
               "(12, \"Extra Supplies\", \"20% cooldown reduction to support abilities\")," +
               "(13, \"Extender\", \"Extends the size of the shield by 25% on turtle and 20% on guardian\")," +
               "(14, \"Fail Safe\", \"Reduces the effect taken from your own explosives by 30%\")," +
               "(15, \"Flying Pig\", \"Increases Long Jump distance by 10% and removes falling damage\")," +
               "(16, \"Focus\", \"Reduces Flinching when hit while iron sighting or scoped by 30%\")," +
               "(17, \"Get up\", \"30% increase to health given on revive\")," +
               "(18, \"Guardian Angel\", \"Receive an audio warning whenever a nearby enemy air support is a danger to you and 20% reduced damage from air support abilities\")," +
               "(19, \"Healing Reach\", \"15% increase to size of healing radius\")," +
               "(20, \"Ice Cold\", \"40% increase in time until overheating\")," +
               "(21, \"Lock on\", \"Turrets, Mines and other automated defences react 30% more quickly\")," +
               "(22, \"Looter\", \"Killing an enemy Fire Support Merc will drop a small Ammo Pack, killing an enemy Medic will drop a small Health Pack\")," +
               "(23, \"Mechanic\", \"Improves any repair tools and disarm rates by 20%\")," +
               "(24, \"Nitros\", \"50% increase to barrel acceleration\")," +
               "(25, \"Pineapple Juggler\", \"Allows you to melee hit back mid-air grenades and other projectiles\")," +
               "(26, \"Potent Packs\", \"20% increase to health regen rate given by healing abilities\")," +
               "(27, \"Quick Draw\", \"30% faster weapon/item switching\")," +
               "(28, \"Quick Charge\", \"10% increase to round charge rate\")," +
               "(29, \"Quick Eye\", \"35% faster movement speed and raise/lower times when Iron Sighting\")," +
               "(30, \"Quick Slash\", \"Increases melee slash speed by 15%\")," +
               "(31, \"Recharge\", \"10% reduction to ability cooldown\")," +
               "(32, \"Sneaky\", \"Reduces the amount of sound you generate when running by 50%\")," +
               "(33, \"Spares\", \"Increases the maximum number of magazines that can be carried by 1\")," +
               "(34, \"Spotter\", \"20% increase to the detection radius\")," +
               "(35, \"Springy\", \"Reduces jumping and Long Jump penalties by 35%\")," +
               "(36, \"Steady\", \"22% Increase to deployables health\")," +
               "(37, \"Tough\", \"Reduces the delay untill health regen starts by 66%\")," +
               "(38, \"Try Hard\", \"Gain 10HP for each death you suffer without getting a kill, up to a maximum of 30HP\")," +
               "(39, \"Undercover\", \"10% increase to ability duration\")," +
               "(40, \"Unshakeable\", \"Reduces the damage you take from explosives by 15%\")," +
               "(41, \"Untrackable\", \"Turrets, Mines and other automated defenses react 35% more slowly to your presence\")"
               
        )

        db.execute("INSERT INTO Augments3 (\"AugmentID\", \"Name\", \"Description\")" +
               "VALUES" + 
               "(1, \"Ammo Reach\", \"25% increase to ammo station radius\")," +
               "(2, \"Big Ears \", \"Enemy footsteps and other appropriate noises are 50% \")," +
               "(3, \"Bigger Blast\", \"10% increase to blast radius to AoE weapons. \")," +
               "(4, \"Bomb Squad \", \"Makes enemy deployables, such as Proxmity Mines, more visible. \")," +
               "(5, \"Chopper\", \"15% increase to melee damage.\")," +
               "(6, \"Cool\", \"Doubles the time it takes Mounted MGs to overheat.\")," +
               "(7, \"Double Time\", \"Allows you to reload whilst sprinting\")," +
               "(8, \"Drilled\", \"20% reduction to reload time\")," +
               "(9, \"Enigma\", \"Reduced duration of being spotted by 60%.\")," +
               "(10, \"Explodydendron\", \"10% increase to blast radius to AoE abilities\")," +
               "(11, \"Extra Ammo\", \"Increase the max number of ammo packs by one\")," +
               "(12, \"Extra Supplies\", \"20% cooldown reduction to support abilities\")," +
               "(13, \"Extender\", \"Extends the size of the shield by 25% on turtle and 20% on guardian\")," +
               "(14, \"Fail Safe\", \"Reduces the effect taken from your own explosives by 30%\")," +
               "(15, \"Flying Pig\", \"Increases Long Jump distance by 10% and removes falling damage\")," +
               "(16, \"Focus\", \"Reduces Flinching when hit while iron sighting or scoped by 30%\")," +
               "(17, \"Get up\", \"30% increase to health given on revive\")," +
               "(18, \"Guardian Angel\", \"Receive an audio warning whenever a nearby enemy air support is a danger to you and 20% reduced damage from air support abilities\")," +
               "(19, \"Healing Reach\", \"15% increase to size of healing radius\")," +
               "(20, \"Ice Cold\", \"40% increase in time until overheating\")," +
               "(21, \"Lock on\", \"Turrets, Mines and other automated defences react 30% more quickly\")," +
               "(22, \"Looter\", \"Killing an enemy Fire Support Merc will drop a small Ammo Pack, killing an enemy Medic will drop a small Health Pack\")," +
               "(23, \"Mechanic\", \"Improves any repair tools and disarm rates by 20%\")," +
               "(24, \"Nitros\", \"50% increase to barrel acceleration\")," +
               "(25, \"Pineapple Juggler\", \"Allows you to melee hit back mid-air grenades and other projectiles\")," +
               "(26, \"Potent Packs\", \"20% increase to health regen rate given by healing abilities\")," +
               "(27, \"Quick Draw\", \"30% faster weapon/item switching\")," +
               "(28, \"Quick Charge\", \"10% increase to round charge rate\")," +
               "(29, \"Quick Eye\", \"35% faster movement speed and raise/lower times when Iron Sighting\")," +
               "(30, \"Quick Slash\", \"Increases melee slash speed by 15%\")," +
               "(31, \"Recharge\", \"10% reduction to ability cooldown\")," +
               "(32, \"Sneaky\", \"Reduces the amount of sound you generate when running by 50%\")," +
               "(33, \"Spares\", \"Increases the maximum number of magazines that can be carried by 1\")," +
               "(34, \"Spotter\", \"20% increase to the detection radius\")," +
               "(35, \"Springy\", \"Reduces jumping and Long Jump penalties by 35%\")," +
               "(36, \"Steady\", \"22% Increase to deployables health\")," +
               "(37, \"Tough\", \"Reduces the delay untill health regen starts by 66%\")," +
               "(38, \"Try Hard\", \"Gain 10HP for each death you suffer without getting a kill, up to a maximum of 30HP\")," +
               "(39, \"Undercover\", \"10% increase to ability duration\")," +
               "(40, \"Unshakeable\", \"Reduces the damage you take from explosives by 15%\")," +
               "(41, \"Untrackable\", \"Turrets, Mines and other automated defenses react 35% more slowly to your presence\")"
               
        )

           puts("Basic data inserted")
end



def insert_sawbonez(db, i)
    db.execute("INSERT INTO Cards (\"Slot1\", \"Slot2\", \"Slot3\", \"Generation\", \"MercID\", \"Augment1\", \"Augment2\", \"Augment3\")" +
               "VALUES" +
               "(\"SM\", 7, 2, 1, #{i}, 17, 12, 5)," +
               "(\"SM\", 8, 1, 1, #{i}, 27, 8, 16)," +
               "(\"SM\", 4, 1, 1, #{i}, 17, 6, 37)," +

               "(\"CR\", 7, 3, 1, #{i}, 26, 23, 17)," +
               "(\"CR\", 4, 2, 1, #{i}, 26, 16, 8)," +
               "(\"CR\", 8, 1, 1, #{i}, 12, 16, 5)," +
               
               "(\"BL\", 7, 1, 1, #{i}, 40, 26, 33)," +
               "(\"BL\", 4, 3, 1, #{i}, 23, 6, 8)," +
               "(\"BL\", 8, 2, 1, #{i}, 23, 37, 27)," +
               
               "(\"SM\", 7, 2, 2, #{i}, 17, 12, 41)," +
               "(\"SM\", 8, 3, 2, #{i}, 27, 40, 16)," +
               "(\"SM\", 4, 1, 2, #{i}, 26, 8, 4)," +

               "(\"CR\", 7, 3, 2, #{i}, 26, 23, 17)," +
               "(\"CR\", 4, 2, 2, #{i}, 33, 27, 8)," +
               "(\"CR\", 8, 1, 2, #{i}, 12, 4, 40)," +
               
               "(\"BL\", 7, 1, 2, #{i}, 12, 26, 33)," +
               "(\"BL\", 4, 3, 2, #{i}, 23, 40, 8)," +
               "(\"BL\", 8, 2, 2, #{i}, 7, 17, 27);"
    
    )
end

def insert_cards(db)
    insert_sawbonez(db, 4)
end

wipe(db)
create_tables(db)
insert_data(db)
insert_cards(db)

puts db.execute("SELECT Slot1 FROM Cards WHERE Generation == 1")