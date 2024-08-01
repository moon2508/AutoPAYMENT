
import confg from './config'

class topup_v1 {

  
  download_v1(username, url_base, rqID,  keyBirthdayTime, token, productId, quantity) {

    const rqDownload = `
        <partnerDownloadSoftpinV10 xmlns="http://interfaces.itopup.vnptepay.vn">
              <username>${username}</username>
              <buyItems>
              <buyItem>
              <quantity>${quantity}</quantity>
              <productId>${productId}
              </productId>
              </buyItem>
  </buyItems>
              <requestID>${rqID}</requestID>
              <keyBirthdayTime>${keyBirthdayTime}</keyBirthdayTime>
              <token>${token}</token>
          </partnerDownloadSoftpinV10>
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
  topup_v1(username, url_base, rqID, token, phone, providerCode, amount) {

    const rq_Topup = `
        <partnerDirectTopupGame xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <providerCode>${providerCode}</providerCode>
            <targetAccount>${phone}</targetAccount>
            <amount>${amount}</amount>
            <requestID>${rqID}</requestID>
            <token>${token}</token>
        </partnerDirectTopupGame>
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

    cy.log('Giao dịch:' + rqID + " TOPUP thành công")

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
  checktopup_v1(username, url_base, rqID, token) {
    const rq_checkTrans = `
        <getDirectTransDetail xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <requestID>${rqID}</requestID>
            <token>${token}</token>
        </getDirectTransDetail>
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
    });


  }
  redownload_v1(username, url_base, rqID, keyBirthdayTime, token) {

    const requestRedownload = `
      <partnerRedownloadSoftpin xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <requestId>${rqID}</requestId>
            <keyBirthdayTime>${keyBirthdayTime}</keyBirthdayTime>
            <token>${token}</token>
        </partnerRedownloadSoftpin>

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

    


    });
  }



}

module.exports = new topup_v1();