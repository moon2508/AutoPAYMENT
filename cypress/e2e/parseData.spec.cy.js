const xml2js = require('xml2js');

describe('SOAP API Testing - FULL Flow Transaction', () => {
  it('sign data RSA-SHA256', () => {
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">soapenv:Body<ns1:requestHandleResponse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="http://interfaces.itopup.vnptepay.vn"><requestHandleReturn xsi:type="xsd:string">{
        "errorCode": 0,
        "errorMessage": "success",
        "merchantBalance": 419162733841,
        "token": "f76716f2d7822773f9bdf6b2f7ca1bb9c66b3936ed9f7482",
        "accRealType": null,
        "products": [
        {
        "productId": 1,
        "productValue": 10000,
        "categoryName": null,
        "serviceProviderName": null,
        "commission": 0.03,
        "softpins": [
        {
        "softpinId": 0,
        "softpinSerial": "Q9CDS38O7V9293",
        "softpinPinCode": "1IPftbBeSEBnTvC9WbVHyMGsE1YeEHqb",
        "expiryDate": "2025/06/22 00:00:00"
        }
        ]
        }
        ],
        "requestID": "HangPTDV_9595_512024",
        "sysTransId": 455022,
        "signature": "b194e0a2452d933cfc2ecf2daee2686c3620fefeea9ba489e47351144a4de262b109ae68ad6f6bb0357df23120e56d7152832332648ece81068e1a0e2cda05acdb705e2aaf05f252f2b0a10c3f44408aab28141ab4c4e0a5ce1c84e1d1dd6ce453ae444a28ab1d5fbacd1f43acd8e886e6d4f2f6922ce2dc134def64cab4184dfd54e3597df4dbd008c20fde19245ff72438008db2713ad1c24bd7b0774e7a930939eef8207aec25db04b02a894a7ec9b4b0a0427c023831cbee4650e54890f43ed032412fbbe6490c27a1e90958eec7ca6473a661c499f1469c1921e9c860c12facf7371a5f68fc49173eb952a7c038ccde84512ce15cd6bc698d6097a7f6e6"
        }</requestHandleReturn></ns1:requestHandleResponse></soapenv:Body></soapenv:Envelope>`;
        
        cy.document().then((doc) => {
          const parser = new doc.defaultView.DOMParser();
          const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
          const xmlParser = new xml2js.Parser({ explicitArray: false });
        
          xmlParser.parseString(xmlDoc, (err, result) => {
            if (err) {
              cy.log('Lỗi khi chuyển đổi XML sang JSON:', err);
            } else {
              const jsonString = result['soapenv:Envelope']['soapenv:Body']['ns1:requestHandleResponse']['requestHandleReturn']['_'];
              cy.log('JSON:', jsonString);
            }
          });
        });
});
});