// This document contains all the functions which would be stored in the firebase backend AppPlatform
// to upload function to backend, command line this: firebase deploy --only functions
// once successfully uploaded, the function would be visible at firebase console––project shortcust––functions
// to see how to use in the source script of the website, please see the indexe.js file under src FunctionBuilder

// imports, all from firebase library. and we use mailjet as our email provider
const functions =require("firebase-functions");
const admin=require("firebase-admin");
const { AppPlatform } = require("firebase-admin/lib/project-management/app-metadata")
const { WebpackOptionsValidationError } = require("webpack")
const { FunctionBuilder } = require("firebase-functions")
const mailjet=require("node-mailjet").apiConnect(
    functions.config().mailjet.public,
    functions.config().mailjet.secret,
);
admin.initializeApp();


//these are basic demonstrations of 2 types firebase cloud functions: on request and on call
// http request 1
exports.randomCode = functions.https.onRequest((request, response)=>{
  const number=Math.round(Math.random()*100000);
  response.send(number.toString());
});

// http callable 1
exports.saySomething= functions.https.onCall((data, context)=>{
//   mailjet
//       .get("contact")
//       .request()
//       .then((result) => console.log(result.body))
//       .catch((err) => console.error(err.statusCode, err.message));
  return "hello, my friend";
});


// http callable email verification
exports.send_email_verification = functions.https.onCall(
    async (data, context)=>{
      const email=data.email;
      // check if email already used by a registered user
      const userRecords = await admin.auth().listUsers();
      const emails = userRecords.users.map((user)=> user.email);
      for (const userEmail of emails) {
        if (email == userEmail) {
          return {success: false, error: "Email is already Registered"};
        }
      }
      // create code and store it. but this is only stored in backend
      // for our reference, the code is directly returned by the function
      const code=Math.round(Math.random()*100000);
      const db=admin.firestore();
      const colRef=db.collection("emails");
      const docData={
        emailaddr: email,
        vericode: code,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      try {
        await colRef.add(docData);
      } catch (error) {
        console.error("Error adding document: ", error);
        return {success: false, error: error.message};
      }
      // Send email
      const request=mailjet
          .post(
              "send", {"version": "v3.1"},
          ).request({
            "Messages": [
              {
                "From": {
                  "Email": "hansss.shen@gmail.com",
                  "Name": "StudentStay",
                },
                "To": [
                  {
                    "Email": email,
                    "Name": "New User",
                  },
                ],
                "Subject": "Your Verification Code from StudentStay",
                "TextPart": "Your Verification code is " + code,
                "HTMLPart": `<h3> Your Verification code is ${code}</h3>`,
              },
            ],
          });
      return request.then(
          (result)=>{
            console.log(result.body);
            return {success: true, password: code};
          },
      )
          .catch((err) => {
            console.log(err.statusCode);
            return {success: false, password: code};
          });
    });

