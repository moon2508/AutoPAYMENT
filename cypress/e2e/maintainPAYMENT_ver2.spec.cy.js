
const crypto = require('crypto');
const fs = require('fs');
const forge = require('node-forge');

function getrequestId(text){
 const min = Math.ceil(1);
 const max = Math.floor(1000);
 const randomNumbers=  Math.floor(Math.random() * (max - min + 1) + min);
 // get date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const second = currentDate.getSeconds();

// Format the date as per your requirements
const formattedDate = `${day}${month}${year}${hour}${minute}${second}${randomNumbers}`;

const requestID = text + formattedDate;
return requestID;

}



function xmlProperty(xml, property) {
  return Cypress.$(Cypress.$.parseXML(xml)).find(property).text();
}
const url_base = "https://haloship.imediatech.com.vn:8087/ItopupService2.0_IMD/services/TopupInterface";
const username = "IMEDIA_TEST";
const password = "24112536637251";
const keyBirthdayTime = '2022/11/29 09:26:01.690';
const softPinKey = "70cf4fe7b75b72ddd78cbdb6";
const productId = 1;
    const quantity = 1;
    const providerCode = 'DataVMS';
    const phone = '0902345678';
    const amount = 50000;

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
const public_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAslVlUfkz+0xiFZOvVd/6
FRiV+WR3Twn2W0Oi9hKHsfuoiYPjOu8t6DKWB88VIjfVSjDiL59LJ/Podums7fZR
0EQ+ByYp0gQqqEbPRv/ZSy3AxrW3V7S3A3z0+vuZ7SG/gijUV0B1oq0jN9MlV6m8
C3+UFoMzh+l+AgtkeZDNjHAEXiHkYcRjfNI+dL05kWUPVPc2PBDJ/TitvwzZ2dv2
dLlx7KAFbZnMeO7vflxZNmXvcRNXSkj/6KEbVrQCsJuUO7+OijgbQ813Nujqm5JH
lsAi0bV8u5muklYCgE/QOBio6uv6+hiCnnq9HcJZsWd1auS0iwAQTA/G2TeKca8o
vwIDAQAB
-----END PUBLIC KEY-----`;



function signDataWithRSA(data, privateKey) {
  // const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(data);
  const signature = sign.sign(privateKey, 'base64');
  return signature;
}

function verifySignDataWithPublicKey(data, hexSignature, publicKey){
// Convert hex signature to binary
const signature = forge.util.hexToBytes(hexSignature);

// Load public key
const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);

// Verify signature
const md = forge.md.sha256.create();
md.update(data, 'utf8');
const verificationResult = publicKeyObj.verify(md.digest().bytes(), signature); 
if(expect(verificationResult).to.eq(true)){
  cy.log('Verify thành công')
};

}



function login(username, password){
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
    cy.log("Response body: " + response.body);
    const errorCode = xmlProperty(response.body, 'errorCode');
      const errorMessage = xmlProperty(response.body, 'errorMessage');
      const token = xmlProperty(response.body, 'token');
      // cy.wrap('token').as('token');
      // cy.setToken(token);
      Cypress.env('token', token);
      cy.log(errorCode);
      expect(errorCode).to.eq('0');
      // cy.log(errorMessage);
      cy.log("Token : " + token);
  })
}

function download(username, privateKey, keyBirthdayTime, token, productId,quantity){
  const rqID = getrequestId("HangPTDV_Download_");
  Cypress.env('request_download', rqID);
  const data = username + '|' + rqID + '|' + token + '|' + '1000';
  // Đường dẫn đến tệp khóa bí mật RSA của bạn

  const signature = signDataWithRSA(data, privateKey);
  cy.log('Data DOWNLOAD:' + data);
  cy.log('Signature DOWNLOAD:' + signature);
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
</Body>
</Envelope>
    `,
  }).then((response) => {
    // Kiểm tra phản hồi
    expect(response.status).to.eq(200);
    cy.log("Response DOWNLOAD: " + response.body);
    const data_response = xmlProperty(response.body, 'requestHandleReturn');
    
    // cy.log(data_response);
    
    const jsonData = JSON.parse(data_response);
    const softpinPinCode = jsonData.products[0].softpins[0].softpinPinCode;
    const signature_res = jsonData.signature;
    const errorCode_res = jsonData.errorCode;
    const sysTransID_res = jsonData.sysTransId;

    const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|"+ token;


    cy.log("Chữ ký IME trả về: "+ signature_res);
    cy.log("Dữ liệu verify: "+ data_verify);
    // thực hiện verify dữ liệu trả về
    verifySignDataWithPublicKey(data_verify, signature_res, public_key);


    //thực hiện giải mã chuỗi mã thẻ
    cy.log('Softpin Pin Code:'+  softpinPinCode);  
    
    const decryptedString = decrypt(softpinPinCode, softPinKey);
    cy.log("Decrypted Softpin Pin Code:" +  decryptedString);

    cy.log('Giao dịch ' + rqID + ' DOWNLOAD Thành công ');
    // expect(errorMessage).to.eq('success')

  });
}
function topup(username,privateKey,token,phone, providerCode, amount){
  const rqID = getrequestId("HangPTDV_TOPUP_");
  const data = username + '|' + rqID + '|' + token + '|' + '1200';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data TOPUP :' + data);
    cy.log('Signature TOPUP:' + signature);
  Cypress.env('request_topup', rqID);
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
"targetAccount": "${phone}",
"providerCode": "${providerCode}",
"topupAmount": ${amount},
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
    cy.log(" Response TOPUP: " + response.body);
    const data_response = xmlProperty(response.body, 'requestHandleReturn');
    
    // cy.log(data_response);
    
    const jsonData = JSON.parse(data_response);
    
    const signature_res = jsonData.signature;
    const errorCode_res = jsonData.errorCode;
    const sysTransID_res = jsonData.sysTransId;
    const reqID_res = jsonData.requestID;

    const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|"+ token;


    cy.log("Chữ ký IME trả về: "+ signature_res);
    cy.log("Dữ liệu verify: "+ data_verify);
    // thực hiện verify dữ liệu trả về
    verifySignDataWithPublicKey(data_verify, signature_res, public_key);
    cy.log('Giao dịch:'+ reqID_res + " TOPUP thành công")


  });
}

function checktopup(username, privateKey,token){
  const rqID = Cypress.env("request_topup");
  const data = username + '|' + rqID + '|' + token + '|' + '1300';
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Data checktopup:' + data);
    cy.log('Signature checktopup:' + signature);
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
            <requestData>{"operation":1300,"username":"${username}",
            "requestID":"${rqID}","signature":"${signature}","token":"${token}"
          }
          </requestData>
        </requestHandle>
    </Body>
</Envelope>
 
    
    `,
  }).then((response) => {
    // Kiểm tra phản hồi
    expect(response.status).to.eq(200);
    cy.log("Response CHECKTOPUP: " + response.body);
    
    const data_response = xmlProperty(response.body, 'requestHandleReturn');
    
    cy.log(data_response);
    
    const jsonData = JSON.parse(data_response);
    
    const signature_res = jsonData.signature;
    const errorCode_res = jsonData.errorCode;
    const sysTransID_res = jsonData.sysTransId;

    const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|"+ token;


    cy.log("Chữ ký IME trả về: "+ signature_res);
    cy.log("Dữ liệu verify: "+ data_verify);
    // thực hiện verify dữ liệu trả về
    verifySignDataWithPublicKey(data_verify, signature_res, public_key);
    

  });
}

function redownload(username, privateKey,token){
  const rqID = Cypress.env('request_download');
  const data = username + '|' + rqID + '|' + token + '|' + '1100';
  // Đường dẫn đến tệp khóa bí mật RSA của bạn

  const signature = signDataWithRSA(data, privateKey);
  cy.log('Data Redownload:' + data);
  cy.log('Signature Redownload:' + signature);
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
    cy.log("Response Redownload: "+ response.body);

    const data_response = xmlProperty(response.body, 'requestHandleReturn');
    
    // cy.log(data_response);
    
    const jsonData = JSON.parse(data_response);
    
    const signature_res = jsonData.signature;
    const errorCode_res = jsonData.errorCode;
    const sysTransID_res = jsonData.sysTransId;

    const data_verify = errorCode_res + "|" + rqID + "|" + sysTransID_res + "|"+ token;


    cy.log("Chữ ký IME trả về: "+ signature_res);
    cy.log("Dữ liệu verify: "+ data_verify);
    // thực hiện verify dữ liệu trả về
    verifySignDataWithPublicKey(data_verify, signature_res, public_key);


  });

}
function decrypt(payload, key) {
  const data = Buffer.from(payload, 'base64');
  const ivSize = 8; // DES-EDE3-CBC uses a fixed IV size of 8 bytes
  const iv = Buffer.from(key, 'utf8').slice(0, ivSize);

  const decipher = crypto.createDecipheriv('des-ede3-cbc', key, iv);
  let decrypted = decipher.update(data, null, 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
describe('SOAP API Testing - FULL Flow Transaction', () => {
  beforeEach(() => {
    login(username,password, url_base);  
  });
  it.skip('sign data RSA-SHA256', () => {


    // Sử dụng hàm ký trong mã chương trình của bạn
    const data = username + '|' + password;
    // Đường dẫn đến tệp khóa bí mật RSA của bạn

    const signature = signDataWithRSA(data, privateKey);
    cy.log('Signature:' + signature);

  })
  it.skip('decrypt datacode ',() =>{
    
    
    // Usage
    const key = "70cf4fe7b75b72ddd78cbdb6";
    const encryptedString = "eRvfzed5rWXUPkj+nDG6FUSOJgg+CdcP";
    
    const decryptedString = decrypt(encryptedString, key);
    cy.log("Decrypted String:", decryptedString);
  })
  it('execute download softpin - 1000 ', () => {
    
    const token = Cypress.env('token');
    
    download(username, privateKey, keyBirthdayTime, token, productId,quantity);
    
  });
  it('execute topup transaction - 1200', () => { 
    const token = Cypress.env('token'); //lấy ra token

    topup(username,privateKey,token,phone, providerCode, amount);

  });

  it('Check topup transaction - 1300', () => {
    const token = Cypress.env('token');
    topup(username,privateKey,token,phone, providerCode, amount);
    checktopup(username, privateKey,token);
   

  });

  it('Redownload transaction - 1100', () => {
    const token = Cypress.env('token');
   
    download(username, privateKey, keyBirthdayTime, token, productId,quantity);
    redownload(username, privateKey,token);
    
  });



});

