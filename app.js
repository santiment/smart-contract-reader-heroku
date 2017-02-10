'use strict';

const Web3 = require('web3');
const _ = require('lodash');
const axios = require('axios');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const credentials = {
        apiKey: process.env.ETHERSCAN_API_KEY,
        contractAddress: process.env.CONTRACT_ADDRESS,
        infuraToken: process.env.INFURA_TOKEN
    };

    console.log(credentials);

    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + credentials.infuraToken));
    const contractUrl = 'https://api.etherscan.io/api?module=contract&action=getabi&address='
        + credentials.contractAddress
        + '&apikey='
        + credentials.apiKey;

    console.log('start');

    axios.get(contractUrl)
        .then(response => {

            const contractABI = JSON.parse(_.get(response, ['data', 'result'], null));
            console.log('etherscan response: ' + response);

            if (!_.isNil(contractABI)) {
                const MyContract = web3.eth.contract(contractABI);
                console.log('contract created');
                const instance = MyContract.at(credentials.contractAddress);
                console.log('instance created');

                const start = instance.PRESALE_START();
                const end = instance.PRESALE_END();
                const collected = instance.total_received_amount();
                const minimumGoal = instance.MIN_TOTAL_AMOUNT_TO_RECEIVE_ETH();
                const maximumGoal = instance.MAX_TOTAL_AMOUNT_TO_RECEIVE_ETH();
                console.log('RPCs executed');


                const result = {
                    start: start.c[0],
                    end: end.c[0],
                    collected: collected.c[0] / 10000,
                    minimumGoal: minimumGoal.c[0],
                    maximumGoal: maximumGoal.c[0]
                };

                console.log('result: ' + JSON.stringify(result, null, 2));
                res.send(result);
            }
            else {
                res.status(500).send('ABI is null');
            }
        })
        .catch(error => {
            console.error('error: ' + JSON.stringify(error, null, 2));
            res.status(500).send(error);
        });
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);
