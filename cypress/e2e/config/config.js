
const crypto = require('crypto');
const fs = require('fs');
const forge = require('node-forge');
class config {
    url_base = "https://haloship.imediatech.com.vn:8087/ItopupService2.0_IMD/services/TopupInterface";
    username = "IMEDIA_TEST";
    password = "24112536637251";
    keyBirthdayTime = '2022/11/29 09:26:01.690';
    softPinKey = "70cf4fe7b75b72ddd78cbdb6";
    productId = 8;
    quantity = 1;
    providerCode = 'Viettel';
    phone = '0982345678';
    amount = 20000;

    privateKey = `-----BEGIN PRIVATE KEY-----
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

    public_key = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAslVlUfkz+0xiFZOvVd/6
FRiV+WR3Twn2W0Oi9hKHsfuoiYPjOu8t6DKWB88VIjfVSjDiL59LJ/Podums7fZR
0EQ+ByYp0gQqqEbPRv/ZSy3AxrW3V7S3A3z0+vuZ7SG/gijUV0B1oq0jN9MlV6m8
C3+UFoMzh+l+AgtkeZDNjHAEXiHkYcRjfNI+dL05kWUPVPc2PBDJ/TitvwzZ2dv2
dLlx7KAFbZnMeO7vflxZNmXvcRNXSkj/6KEbVrQCsJuUO7+OijgbQ813Nujqm5JH
lsAi0bV8u5muklYCgE/QOBio6uv6+hiCnnq9HcJZsWd1auS0iwAQTA/G2TeKca8o
vwIDAQAB
-----END PUBLIC KEY-----`;

createRequest(rqbody){
   const request=`
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
      <Body>
    ${rqbody}
      </Body>
    </Envelope>
    `;
    return request;
};
signDataWithRSA(data, privateKey) {
    // const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(data);
    const signature = sign.sign(privateKey, 'base64');
    return signature;
  }
  
 verifySignDataWithPublicKey(data, hexSignature, publicKey) {
    // Convert hex signature to binary
    const signature = forge.util.hexToBytes(hexSignature);
  
    // Load public key
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  
    // Verify signature
    const md = forge.md.sha256.create();
    md.update(data, 'utf8');
    const verificationResult = publicKeyObj.verify(md.digest().bytes(), signature);
    if (expect(verificationResult).to.eq(true)) {
      cy.log('Verify thành công')
    };
  
  }
 getrequestId(text) {
    const min = Math.ceil(1);
    const max = Math.floor(1000);
    const randomNumbers = Math.floor(Math.random() * (max - min + 1) + min);
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
  
  };

  

   xmlProperty(xml, property) {
    return Cypress.$(Cypress.$.parseXML(xml)).find(property).text();
  }

};


module.exports = new config()