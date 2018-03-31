import idb from 'idb'

idb.open('tenthmantrivia',1,function(upgradeDb){
    switch(upgradeDb.oldVersion){
        case 0:
            var store = upgradeDb.createObjectStore('trivia',{
                keyPath:'id'
            })
    }
})