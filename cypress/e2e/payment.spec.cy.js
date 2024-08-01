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
const url_base = "https://haloship.imediatech.com.vn:8087/ItopupService1.4/services/TopupInterface?wsdl";
// const username ="IMEDIA_TEST";
// const password ="24112536637251";
// const keyBirthdayTime ='2022/11/29 09:26:01.690';
const requestID = 'HangPTDV_'+ randomNum + randomNum +'_'+ formattedDate ;
const username ="IMEDIA_DEV21";
const password ="18174365127585";
const keyBirthdayTime ='2023/07/05 17:34:38.007';

const amount = 6000;
const providerCode = "DataVTT5";
const phone = "0352355678";

const productID = '539';
const quantity = 1;

describe('SOAP API Testing - FULL Flow Transaction', () => {
  beforeEach(()=>
  {
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
      const token = xmlProperty(response.body, 'token') ;
      // cy.wrap('token').as('token');
      // cy.setToken(token);
      Cypress.env('token', token);
      cy.log(errorCode);
      expect(errorCode).to.eq('0');
      // cy.log(errorMessage);
      cy.log(token);
  });
});
  it('execute download softpin - 1000 ', () => {
    const token = Cypress.env('token');
    cy.log(token)
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
        <partnerDownloadSoftpinV10 xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <buyItems>
            <buyItem>
            <quantity>${quantity}</quantity>
            <productId>${productID}
            </productId>
            </buyItem>
</buyItems>
            <requestID>${requestID}</requestID>
            <keyBirthdayTime>${keyBirthdayTime}</keyBirthdayTime>
            <token>${token}</token>
        </partnerDownloadSoftpinV10>
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
      cy.log('Giao dịch '+requestID + ' Thành công ');
      // expect(errorCode).to.eq('0');

    });
    
  });
  it('execute topup transaction - 1200', () => {
    const token = Cypress.env('token');
    cy.log(token)
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
        <partnerDirectTopupGame xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <providerCode>${providerCode}</providerCode>
            <targetAccount>${phone}</targetAccount>
            <amount>${amount}</amount>
            <requestID>${requestID}</requestID>
            <token>${token}</token>
        </partnerDirectTopupGame>
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
      cy.log('Giao dịch '+requestID + ' Thành công ');
      // expect(errorCode).to.eq('0');

    });
    
  });

  it.skip('Check topup transaction - 1300', () => {
    const token = Cypress.env('token');
    cy.log(token)
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
        <getDirectTransDetail xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <requestID>HangPTDV_9696_212024</requestID>
            <token>${token}</token>
        </getDirectTransDetail>
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
      cy.log('Giao dịch Thành công ');
      expect(errorCode).to.eq('0');

    });
    
  });

  it.skip('Redownload transaction - 1100', () => {
    const token = Cypress.env('token');
    cy.log(token)
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
        <partnerRedownloadSoftpin xmlns="http://interfaces.itopup.vnptepay.vn">
            <username>${username}</username>
            <requestId>HangPTDV_6767_212024</requestId>
            <keyBirthdayTime>${keyBirthdayTime}</keyBirthdayTime>
            <token>${token}</token>
        </partnerRedownloadSoftpin>
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
      cy.log('Giao dịch Thành công ');
      expect(errorCode).to.eq('0');

    });
    
  });



});

