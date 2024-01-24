
let bigJSON = {};
let bigJSON2 = {};
let bigJSON3 = {};
let bigJSON4 = {};
let bigJSON5 = {};
let bigJSON6 = {};


const numObjects = 5000000;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const asyncFunction = async () => {

    const scale = 10000000000;

    let progress = 0 / numObjects;
    let steps = 10;
    const numJSON = 5;

    for (let i = 0; i < numObjects / numJSON; i++) {
        const baseString = 'asd32da32er' + Math.random() * scale;
        const innerString = 'asd32da32er' + Math.random() * scale;
        const value = 'asd32da32er' + Math.random() * scale;
        const value2 = 'asd32da32er' + Math.random() * scale;
        const value3 = 'asd32da32er' + Math.random() * scale;
        const value4 = 'asd32da32er' + Math.random() * scale;
        bigJSON[baseString] = {}
        bigJSON[baseString][innerString] = value;
        bigJSON[baseString][value2] = {};
        bigJSON[baseString][value2][value3] = value4;
    }

    if (numJSON > 1) {
        for (let i = 0; i < numObjects / numJSON; i++) {
            const baseString = 'asd32da32er' + Math.random() * scale;
            const innerString = 'asd32da32er' + Math.random() * scale;
            const value = 'asd32da32er' + Math.random() * scale;
            const value2 = 'asd32da32er' + Math.random() * scale;
            const value3 = 'asd32da32er' + Math.random() * scale;
            const value4 = 'asd32da32er' + Math.random() * scale;
            bigJSON2[baseString] = {}
            bigJSON2[baseString][innerString] = value;
            bigJSON2[baseString][value2] = {};
            bigJSON2[baseString][value2][value3] = value4;
        }
        for (let i = 0; i < numObjects / numJSON; i++) {
            const baseString = 'asd32da32er' + Math.random() * scale;
            const innerString = 'asd32da32er' + Math.random() * scale;
            const value = 'asd32da32er' + Math.random() * scale;
            const value2 = 'asd32da32er' + Math.random() * scale;
            const value3 = 'asd32da32er' + Math.random() * scale;
            const value4 = 'asd32da32er' + Math.random() * scale;
            bigJSON3[baseString] = {}
            bigJSON3[baseString][innerString] = value;
            bigJSON3[baseString][value2] = {};
            bigJSON3[baseString][value2][value3] = value4;
        }
        for (let i = 0; i < numObjects / numJSON; i++) {
            const baseString = 'asd32da32er' + Math.random() * scale;
            const innerString = 'asd32da32er' + Math.random() * scale;
            const value = 'asd32da32er' + Math.random() * scale;
            const value2 = 'asd32da32er' + Math.random() * scale;
            const value3 = 'asd32da32er' + Math.random() * scale;
            const value4 = 'asd32da32er' + Math.random() * scale;
            bigJSON4[baseString] = {}
            bigJSON4[baseString][innerString] = value;
            bigJSON4[baseString][value2] = {};
            bigJSON4[baseString][value2][value3] = value4;
        }
        for (let i = 0; i < numObjects / numJSON; i++) {
            const baseString = 'asd32da32er' + Math.random() * scale;
            const innerString = 'asd32da32er' + Math.random() * scale;
            const value = 'asd32da32er' + Math.random() * scale;
            const value2 = 'asd32da32er' + Math.random() * scale;
            const value3 = 'asd32da32er' + Math.random() * scale;
            const value4 = 'asd32da32er' + Math.random() * scale;
            bigJSON5[baseString] = {}
            bigJSON5[baseString][innerString] = value;
            bigJSON5[baseString][value2] = {};
            bigJSON5[baseString][value2][value3] = value4;
        }
    }


    console.log(`done all`)

    while (true) {
        await (sleep(500))
    }
}

asyncFunction();