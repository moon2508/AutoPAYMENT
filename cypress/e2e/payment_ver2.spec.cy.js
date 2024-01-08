function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNum = getRandomInt(1, 100);
// get date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
const day = currentDate.getDate();

// Format the date as per your requirements
const formattedDate = `${day}${month}${year}`;

function xmlProperty(xml, property) {
  return Cypress.$(Cypress.$.parseXML(xml)).find(property).text();
}
const url_base = "https://haloship.imediatech.com.vn:8087/ItopupService2.0_IMD/services/TopupInterface";
const username = "IMEDIA_TEST";
const password = "24112536637251";
const keyBirthdayTime = '2022/11/29 09:26:01.690';
const requestID = 'HangPTDV_' + randomNum + randomNum + '_' + formattedDate;
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyVWVR+TP7TGIV
k69V3/oVGJX5ZHdPCfZbQ6L2Eoex+6iJg+M67y3oMpYHzxUiN9VKMOIvn0sn8+h2
6azt9lHQRD4HJinSBCqoRs9G/9lLLcDGtbdXtLcDfPT6+5ntIb+CKNRXQHWirSM3
0yVXqbwLf5QWgzOH6X4CC2R5kM2McAReIeRhxGN80j50vTmRZQ9U9zY8EMn9OK2/
DNnZ2/Z0uXHsoAVtmcx47u9+XFk2Ze9xE1dKSP/ooRtWtAKwm5Q7v46KOBtDzXc2
6OqbkkeWwCLRtXy7ma6SVgKAT9A4GKjq6/r6GIKeer0dwlmxZ3Vq5LSLABBMD8bZ
N4pxryi/AgMBAAECggEAVWyEkUS/OrQ3E8Dfr1IPuEVDqegPIqRSBxuaFyd/Kqmy
7NRpZ5Skt+Jrbagrpm16VQSfhFJYrPWwOC3tMTvZqtrVn5UPWVO3n030Aj2SN+nd
uxHWlkOxmxEjRIp7DFUrKE0okfcFonwvL5GMBLcApb1iEXqdl5AoVRBh+716SLed
/dE3ShM1L9IsaQxuMN0TGwNUZkZYzfB2umxMvlHcmCESCHuMHO/RncamTB7QdhEK
r3mtd8xZecuFimLh1ClRLJDZebeLb8ybrt3krWPArgLYZCDPZKnDSnxG35yzJA37
cdK71ML5W/IvcGBethga2tMV5ke+Emfi4EpsybyyqQKBgQDtOFHyOH3f9p6X5QIx
macsFuotAWhGfUEocLboNO720JTi4Mw4N+YImNz9ksSNFXGXBMJCEvAxAyWVAeB1
d6M2CZJlybnXd0NkvP8mQvGGCx2IFMuRtzynIGDAOivs0wWC1PxQYEyDzGE5/QSv
rwCC1YKJKNTbsakPjhqx3wbnwwKBgQDAc6OPIvOWLpGO3sqjIfbr+a/Iq/YlRz+1
bX6aEOe5JN4C4xs1EnEg8q9g9NK5/mH2ctI6pG8AxO/sBWFHPzDm0g6UK0ESIley
XpDYB4BsEeoA6pYkBcfyDarHe03WhUS7u9/ZYVGwwa4J2uGZ4CmAoWuXIvC1hPJU
fWRakLynVQKBgCW7J42XXq4Y0/DlBAxPnD9vBaBS8PsFQS/lfbJBeSDY3FWZ2+G1
QmlrpvrONWUbXA3hO+S2jm29SmUA/2qvtM4Lh7WY+G5FEfsb9JlpXHEto2zZoedz
dbo/dCQfHI12oxHEPr2qE4GDKJPIos4uz63/t9uJGxI2l+VZfPV9u+NxAoGBALVi
SB14C6zYZ0gIo2PtdxQhWJQBvxSTenA8qr36gOv222hNNC9pGka7dKAlHxc9sobc
4Vdz80r+UkJZL74+yJBEGol72vCEfbMXfdyd9WPl3m7OqoN5D2ILj5JDnLE7GfT2
tZvkJWI6qRWQvmCQ7YzWltjzjXsHun33UMYq9COhAoGBAMQOLtARpd6zh7vgepnd
v46DLRXUuAGHl0jDssSPJabDeMufgsqlGa8Vyy4+4X1ZIhqM+cD1k6uBjiodlUAE
DXCntABHCGckX5298IljOQTUq5UpnsAm98n9+LkwTPU+aQ2OUT/fT/jluXVlNSoz
c5DZy1yl2g4BJPashtqNjnCW
-----END PRIVATE KEY-----`;

const crypto = require('crypto');
const fs = require('fs');

function signDataWithRSA(data, privateKey) {
  // const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  const signature = sign.sign(privateKey, 'base64');
  return signature;
}

describe('SOAP API Testing - FULL Flow Transaction', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <signInAsPartner xmlns="http://interfaces.itopup.vnptepay.vn">
                <username>${username}</username>
                <password>${password}</password>
            </signInAsPartner>
        </Body>
    </Envelope>
        `,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(response.body);




      const errorCode = xmlProperty(response.body, 'errorCode');
      const errorMessage = xmlProperty(response.body, 'errorMessage');
      const token = xmlProperty(response.body, 'token');
      // cy.wrap('token').as('token');
      // cy.setToken(token);
      Cypress.env('token', token);
      cy.log(errorCode);
      expect(errorCode).to.eq('0');
      // cy.log(errorMessage);
      cy.log(token);
    });
  });
  it.skip('sign data RSA-SHA256', () => {


    // Sử dụng hàm ký trong mã chương trình của bạn
    const data = username + '|' + password;
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Signature:' + signature);

  })
  it.skip('execute download softpin - 1000 ', () => {
    const token = Cypress.env('token');
    const rqID = requestID;
    cy.log(rqID);
    cy.log(token);
    const data = username + '|' + rqID + '|' + token + '|' + '1000';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data:' + data);
    cy.log('Signature:' + signature);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
<requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">

<requestData>
{
  "operation": 1000,
  "username": "${username}",
  "buyItems": [
    {
      "productId": 1,
      "quantity": 1
    }
  ],
  "requestID": "${rqID}",
  "keyBirthdayTime": "${keyBirthdayTime}",
  "signature": "${signature}",
  "token": "${token}"
}
</requestData>
</requestHandle>
</Body>
</Envelope>
      `,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(response.body);
      const errorMessage = xmlProperty(response.body, 'errorMessage');
      const errorCode = xmlProperty(response.body, 'errorCode');
      cy.log(errorMessage);
      cy.log('Giao dịch ' + requestID + ' Thành công ');
      // expect(errorMessage).to.eq('success');

    });
    // cy.log(request.body)

  });
  it.skip('execute topup transaction - 1200', () => {
    const token = Cypress.env('token');
    const rqID = requestID;
    cy.log(rqID);
    cy.log(token);
    const data = username + '|' + rqID + '|' + token + '|' + '1200';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data:' + data);
    cy.log('Signature:' + signature);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Body>
<requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">

<requestData>
{
  "operation": 1200,
  "username": "${username}",
  "requestID": "${rqID}",
  "targetAccount": "0982345679",
  "providerCode": "Viettel",
  "topupAmount": 20000,
  "signature": "${signature}",
  "token":"${token}"
}
</requestData>
</requestHandle>
</Body>
</Envelope>
      `,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(response.body);
      const errorMessage = xmlProperty(response.body, 'errorMessage');
      const errorCode = xmlProperty(response.body, 'errorCode');
      cy.log(errorMessage);
      cy.log('Giao dịch ' + requestID + ' Thành công ');
      // expect(errorMessage).to.eq('success');

    });

  });

  it('Check topup transaction - 1300', () => {
    const token = Cypress.env('token');
    const rqID = 'HangPTDV_8181_812024';
    cy.log(rqID);
    cy.log(token);
    const data = username + '|' + rqID + '|' + token + '|' + '1300';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data:' + data);
    cy.log('Signature:' + signature);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
    <requestHandle
    xmlns="http://interfaces.itopup.vnpt
    epay.vn"> <requestData>
    {"operation":1300,"username":"${username}",
    "requestID":"${rqID}","signature":"${signature}","token":"${token}"
} </requestData>
</requestHandle>
    </Body>
</Envelope>
      
      `,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(response.body);
      
      cy.log('Giao dịch Thành công ');
      

    });

  });

  it.skip('Redownload transaction - 1100', () => {
    const token = Cypress.env('token');
    const rqID = "HangPTDV_6666_812024";
    cy.log(rqID);
    cy.log(token);
    const data = username + '|' + rqID + '|' + token + '|' + '1100';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data:' + data);
    cy.log('Signature:' + signature);

    cy.request({
      method: 'POST',
      url: url_base,
      headers: {
        'Content-Type': 'text/xml',

        SOAPAction: '',
      },
      body: `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <requestHandle xmlns="http://interfaces.itopup.vnptepay.vn">
<requestData>

{"operation":1100,"username":"${username}","requestID":"${rqID}","keyBirthdayTime":
"${keyBirthdayTime}","signature":"${signature}", "token": "${token}"}
</requestData>
</requestHandle>
    </Body>
</Envelope>
      
      `,
    }).then((response) => {
      // Kiểm tra phản hồi
      expect(response.status).to.eq(200);
      cy.log(response.body);

      cy.log('Giao dịch Thành công ');


    });

  });



});

