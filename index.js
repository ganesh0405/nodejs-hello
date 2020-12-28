const {Firestore} = require('@google-cloud/firestore');
const db = new Firestore();

db.settings({ ignoreUndefinedProperties: true });

exports.screening = (req, res) => {

    var id = Math.floor(Math.random() * (1000 - 10) + 10).toString();
    
    const visitor1 = db.collection('nyresidents').doc(id);
    // TODO: call geocode API to get lat,lang 
    // https://maps.googleapis.com/maps/api/geocode/json?address=req.body.address&key=AIzaSyC8IOzN6XowSCUxFyJscNCtEauKp9pZanQ
    visitor1.set({
        first: req.body.firstname,
        last: req.body.lastname,
        address: req.body.address,
        dob: req.body.dob,
        sex: req.body.sex,
        zip: req.body.zip,
        email:req.body.email,
        phone: req.body.phone,
        profession: req.body.profession
    }).then(function (d) {
        console.log("Confirmation No." + id );
        var visitor_a = db.collection('nyresidents').doc(id);
        visitor_a.get().then(function (doc) {
            if (doc.exists) {
                res.send(doc.data()); //doc.data() || 
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });    
    });
};
