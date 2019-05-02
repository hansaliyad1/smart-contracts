const driver    = require('bigchaindb-driver');
const conn      = new driver.Connection(process.env.API_PATH);
const request   = require('request');

module.exports = {

    create(req, res) {
        if (!req.body.asset_name) {
            res.json({ success: false, message: 'Please provide Asset Name.' });
        }
        else if (!req.body.asset_identification) {
            res.json({ success: false, message: 'Please provide Asset Identification.' })
        }
        else if (!req.body.asset_description) {
            res.json({ success: false, message: 'Please provide Asset Description.' });
        }
        else if (!req.body.asset_metadata) {
            res.json({ success: false, message: 'Please provide Asset Metadata.' });
        }
        else if (!req.body.public_key) {
            res.json({ success: false, message: 'Please provide Public Key.' });
        }
        else if (!req.body.private_key) {
            res.json({ success: false, message: 'Please provide Private Key.' })
        }
        else {

            const key_pair = { publicKey: req.body.public_key, privateKey: req.body.private_key };
            const asset = {
                asset_name: req.body.asset_name,
                asset_identification: req.body.asset_identification,
                asset_description: req.body.asset_description
            };

            // Construct a transaction payload
            const txCreate = driver.Transaction.makeCreateTransaction(asset,
                // Metadata field, contains information about the transaction itself
                // (can be `null` if not needed)
                {
                    datetime: new Date().toString(),
                    metadata: req.body.asset_metadata
                },
                // Output. For this case we create a simple Ed25519 condition
                [driver.Transaction.makeOutput(
                    driver.Transaction.makeEd25519Condition(key_pair.publicKey))],
                // Issuers
                key_pair.publicKey
            );
            // The owner of the painting signs the transaction
            const txSigned = driver.Transaction.signTransaction(txCreate,
                key_pair.privateKey);

            // Send the transaction off to BigchainDB
            conn.postTransactionCommit(txSigned)
                .then(response => {
                    console.log(response);
                    res.json({ success: true, message: 'Asset Created!', keys: key_pair, txID: txSigned.id });
                })

        }
    },

    createDiv(req, res) {
        if (!req.body.asset_name) {
            res.json({ success: false, message: 'Please provide Asset Name.' });
        }
        else if (!req.body.asset_quantity) {
            res.json({ success: false, message: 'Please provide Asset Quantity.' });
        }
        else if (!req.body.asset_identification) {
            res.json({ success: false, message: 'Please provide Asset Identification.' })
        }
        else if (!req.body.asset_description) {
            res.json({ success: false, message: 'Please provide Asset Description.' });
        }
        else if (!req.body.asset_metadata) {
            res.json({ success: false, message: 'Please provide Asset Metadata.' });
        }
        else if (!req.body.public_key) {
            res.json({ success: false, message: 'Please provide Public Key.' });
        }
        else if (!req.body.private_key) {
            res.json({ success: false, message: 'Please provide Private Key.' })
        }
        else {
            const asset_quantity = req.body.asset_quantity;
            const key_pair = { publicKey: req.body.public_key, privateKey: req.body.private_key };

            const asset = {
                asset_name: req.body.asset_name,
                asset_quantity: req.body.asset_quantity,
                asset_identification: req.body.asset_identification,
                asset_description: req.body.asset_description
            };

            // Construct a transaction payload
            const tx = driver.Transaction.makeCreateTransaction(asset,
                // Metadata field, contains information about the transaction itself
                // (can be `null` if not needed)
                {
                    metadata: req.body.asset_metadata,
                    datetime: new Date().toString()
                },
                // Output: Divisible asset, include asset_quantity as parameter
                [driver.Transaction.makeOutput(driver.Transaction
                    .makeEd25519Condition(key_pair.publicKey), asset_quantity.toString())],
                key_pair.publicKey
            );

            // Sign the transaction with the private key of the token creator
            const txSigned = driver.Transaction
                .signTransaction(tx, key_pair.privateKey);

            console.log('About to  send!');
            // Send the transaction off to BigchainDB
            conn.postTransactionCommit(txSigned)
                .then(response => {
                    console.log(response);
                    res.json({ success: true, message: 'Asset Created!', keys: key_pair, txID: response.id, asset_left: asset_quantity });
                })
        }
    },

    retrieve(req, res) {
        if (!req.body.public_key) {
            res.json({ success: false, message: 'Please provide public key.' });
        }
        else {

            let options = {
                method: 'GET',
                url: process.env.API_PATH + 'outputs',
                qs: { public_key: req.body.public_key },
            };

            request(options,  (error, response, body) =>  {
                if (error) {
                    res.json({ success: false, message: error })
                }
                else {
                    res.json({ success: true, message: 'We found below transactions!', txid: body });
                }
            });

        }
    },

    info(req, res) {
        if (!req.params.txid) {
            res.json({ success: false, message: 'Please provide Transaction ID.' })
        }
        else {
            let options = { method: 'GET',
                url: process.env.API_PATH + 'transactions/' + req.params.txid,
            };

            request(options, (error, response, body) => {
                if (error) {
                    res.json({ success: false, message: error });
                }
                else {
                    res.json({ success: true, message: 'We found below Transaction Info!', info: JSON.parse(body) })
                }
            });

        }
    },

    transfer(req, res) {
        if (!req.body.txid) {
            res.json({ success: false, message: 'Please provide Transaction ID of the asset.' });
        }
        else if (!req.body.newowner_public_key) {
            res.json({ success: false, message: 'Please provide new owner public key.' });
        }
        else if (!req.body.currentowner_private_key) {

        }
        else if (!req.body.metadata) {
            res.json({ success: false, message: 'Please provide metadata.' });
        }
        else {
            conn.getTransaction(req.body.txid)
                .then((txCreated) => {
                    const createTranfer = driver.Transaction.
                    makeTransferTransaction(
                        // The output index 0 is the one that is being spent
                        [{
                            tx: txCreated,
                            output_index: 0
                        }],
                        [
                            driver.Transaction.makeOutput(
                            driver.Transaction.makeEd25519Condition(req.body.newowner_public_key))
                        ],
                        {
                            datetime: new Date().toString(),
                            metadata: req.body.metadata
                        }
                    );
                    // Sign with the key of the owner of the painting (Alice)
                    const signedTransfer = driver.Transaction.signTransaction(createTranfer, req.body.currentowner_private_key)
                    return conn.postTransactionCommit(signedTransfer)
                })
                .then(response => {
                    console.log(response);
                    res.json({ success: true, message: 'Asset Transferred.' })
                })
                .catch(err => {
                    res.json({ success: false, message: 'Cannot Transfer Asset.' })
                })
        }
    }

};
