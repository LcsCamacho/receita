import * as tedious from 'tedious';

const Connection = tedious.Connection;

const config = {  
    server: 'controle-frota.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'admin-frota', 
            password: '@DM15785'  
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'controle-frota '
    }
};  
export const connection = new Connection(config);  
connection.on('connect', (err) => {  
    if(err) {
        console.log(err);
    }
    console.log("Connected");  
});

connection.connect();