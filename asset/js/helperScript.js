// THIS HELPER FILE HERE IS TO HAVE ALL THE EXTRA METHODS AND FUNCTIONALITIES THAT ARE BASICALLY USED FOR MANY THINGS

// import {Timeout_Seconds} from "./configure";

// This code is here for timeout error if network is too slow

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} second!! Please Reload the Browser!!`));
        }, s*1000);
    });
};

// getJSON is used to get all the responses from multiple API's

export const getJSON = async (URL) => {
    try {
        const fetchPromise = fetch(URL);
        const Response = await Promise.race([fetchPromise, timeout(10)]);
        const ReceivedDATA = await Response.json();

        if(!Response.ok){
            if(Response.status === 400) {
                throw new Error (`Sorry!! No recipes found for your query. Please try something else!!`);
            }
            throw new Error (`${ReceivedDATA.error} Error Code: (${Response.status})`);
        }
        return ReceivedDATA;
    }
    catch (err) {
        throw err;
    }
};


// Sending JSON to the API servers

export const sendJSON = async (URL, uploadData) => {
    try {
        const fetchPromise = fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData),
        });
        
        const Response = await Promise.race([fetchPromise, timeout(10)]);
        const ReceivedDATA = await Response.json();

        if(!Response.ok){
            if(Response.status === 400) {
                throw new Error (`Sorry!! No recipes found for your query. Please try something else!!`);
            }
            throw new Error (`${ReceivedDATA.error} Error Code: (${Response.status})`);
        }
        return ReceivedDATA;
    }
    catch (err) {
        throw err;
    }
};




