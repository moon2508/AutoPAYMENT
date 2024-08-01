
import confg from './config'

class topup_v2 {

  login(username, password, url_base) {
    const requestLogin = `
            <signInAsPartner xmlns="http://interfaces.itopup.vnptepay.vn">
                <username>${username}</username>
                <password>${password}</password>
            </signInAsPartner>
      `;
    const requestXml = confg.createRequest(requestLogin);

    cy.log(`Request Đầu vào: ${requestXml}`);
    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: requestXml,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log("Response body: " + response.body);
      const errorCode = confg.xmlProperty(response.body, 'errorCode');
      const errorMessage = confg.xmlProperty(response.body, 'errorMessage');
      const token = confg.xmlProperty(response.body, 'token');
      const data = {
        token: token
      };
      //   Cypress.env('token', token);
      cy.log('errorCode: ' + errorCode + ' ' + errorMessage);
      expect(errorCode).to.eq('0');
      cy.log("Token : " + token);
      cy.writeFile('cypress/fixtures/accData.json', data);

    })
  };
  download(username, url_base, rqID, signature, keyBirthdayTime, token, productId, quantity) {

    cy.log('Signature DOWNLOAD:' + signature);
    const rqDownload = `
        <requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">
      
      <requestData>
      {
      "operation": 1000,
      "username": "${username}",
      "buyItems": [
        {
          "productId": ${productId},
          "quantity": ${quantity}
        }
      ],
      "requestID": "${rqID}",
      "keyBirthdayTime": "${keyBirthdayTime}",
      "signature": "${signature}",
      "token": "${token}"
      }
      </requestData>
      </requestHandle>
        `
    const requestXml = confg.createRequest(rqDownload);
    cy.log(`Request Đầu vào: ${requestXml}`);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: requestXml,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log("Response DOWNLOAD: " + response.body);
      const data_response = confg.xmlProperty(response.body, 'requestHandleReturn');

      // cy.log(data_response);

      // const jsonData = JSON.parse(data_response);
      // const softpinPinCode = jsonData.products[0].softpins[0].softpinPinCode;
      // const signature_res = jsonData.signature;
      // const errorCode_res = jsonData.errorCode;
      // const sysTransID_res = jsonData.sysTransId;

      // const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|"+ token;


      // cy.log("Chữ ký IME trả về: "+ signature_res);
      // cy.log("Dữ liệu verify: "+ data_verify);
      // // thực hiện verify dữ liệu trả về
      // verifySignDataWithPublicKey(data_verify, signature_res, public_key);


      // //thực hiện giải mã chuỗi mã thẻ
      // cy.log('Softpin Pin Code:'+  softpinPinCode);  

      // const decryptedString = decrypt(softpinPinCode, softPinKey);
      // cy.log("Decrypted Softpin Pin Code:" +  decryptedString);

      cy.log('Giao dịch ' + rqID + ' DOWNLOAD Thành công ');
      // expect(errorMessage).to.eq('success')
      // Đọc dữ liệu từ fixture
      cy.fixture('accData').then((userData) => {
        // Tạo một object mới
        const rqDownloadID = rqID;

        // Kết hợp dữ liệu mới với dữ liệu cũ
        const updatedData = { ...userData, rqDownloadID };

        // Ghi dữ liệu mới vào fixture
        cy.writeFile('cypress/fixtures/userData.json', updatedData);
      });


    });
  }
  topup(username, url_base, rqID, signature, token, phone, providerCode, amount) {

    const rq_Topup = `
        <requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">
      
      <requestData>
      {
      "operation": 1200,
      "username": "${username}",
      "requestID": "${rqID}",
      "targetAccount": "${phone}",
      "providerCode": "${providerCode}",
      "topupAmount": ${amount},
      "signature": "${signature}",
      "token":"${token}"
      }
      </requestData>
      </requestHandle>
        `
    const requestXml = confg.createRequest(rq_Topup);

    cy.log(`Request Đầu vào: ${requestXml}`);


    Cypress.env('request_topup', rqID);
    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: requestXml,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(" Response TOPUP: " + response.body);
      const data_response = confg.xmlProperty(response.body, 'requestHandleReturn');

      // cy.log(data_response);

      const jsonData = JSON.parse(data_response);

      const signature_res = jsonData.signature;
      const errorCode_res = jsonData.errorCode;
      const sysTransID_res = jsonData.sysTransId;
      const reqID_res = jsonData.requestID;

      const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|" + token;


      cy.log("Chữ ký IME trả về: " + signature_res);
      cy.log("Dữ liệu verify: " + data_verify);
      // thực hiện verify dữ liệu trả về
      confg.verifySignDataWithPublicKey(data_verify, signature_res, confg.public_key);
      cy.log('Giao dịch:' + reqID_res + " TOPUP thành công")

      cy.fixture('accData').then((userData) => {
        // Tạo một object mới
        const rqTOPUPID = rqID;

        // Kết hợp dữ liệu mới với dữ liệu cũ
        const updatedData = { ...userData, rqTOPUPID };

        // Ghi dữ liệu mới vào fixture
        cy.writeFile('cypress/fixtures/userData.json', updatedData);
      });
    });
  }
  checktopup(username, url_base, rqID, signature, token) {
    const rq_checkTrans = `
        <requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">
                  <requestData>
                  {"operation":1300,"username":"${username}",
                  "requestID":"${rqID}","signature":"${signature}","token":"${token}"
                }
                </requestData>
              </requestHandle>
        `;

    // Đường dẫn đến tệp khóa bí mật RSA của bạn
    const requestXml = confg.createRequest(rq_checkTrans);

    cy.log(`Request Đầu vào: ${requestXml}`);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: requestXml,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log("Response CHECKTOPUP: " + response.body);

      const data_response = confg.xmlProperty(response.body, 'requestHandleReturn');

      // cy.log(data_response);

      const jsonData = JSON.parse(data_response);

      const signature_res = jsonData.signature;
      const errorCode_res = jsonData.errorCode;
      const sysTransID_res = jsonData.sysTransId;

      const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|" + token;


      cy.log("Chữ ký IME trả về: " + signature_res);
      cy.log("Dữ liệu verify: " + data_verify);
      // thực hiện verify dữ liệu trả về
      confg.verifySignDataWithPublicKey(data_verify, signature_res, confg.public_key);


    });


  }
  redownload(username, url_base, rqID, signature, keyBirthdayTime, token) {

    const requestRedownload = `
      <requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">
      <requestData>

        {"operation":1100,"username":"${username}","requestID":"${rqID}","keyBirthdayTime":
        "${keyBirthdayTime}","signature":"${signature}", "token": "${token}"}
      </requestData>
      </requestHandle>

    `;
    const requestXml = confg.createRequest(requestRedownload);

    cy.log(`Request Đầu vào: ${requestXml}`);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: requestXml,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log("Response Redownload: " + response.body);

      const data_response = confg.xmlProperty(response.body, 'requestHandleReturn');

      // cy.log(data_response);

      const jsonData = JSON.parse(data_response);

      const signature_res = jsonData.signature;
      const errorCode_res = jsonData.errorCode;
      const sysTransID_res = jsonData.sysTransId;

      const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|" + token;


      cy.log("Chữ ký IME trả về: " + signature_res);
      cy.log("Dữ liệu verify: " + data_verify);
      // thực hiện verify dữ liệu trả về
      confg.verifySignDataWithPublicKey(data_verify, signature_res, confg.public_key);


    });
  }



}

module.exports = new topup_v2();