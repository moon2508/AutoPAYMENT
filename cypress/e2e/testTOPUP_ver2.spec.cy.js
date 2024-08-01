import config from "./config/config";
import topup_v2 from "./config/topup_v2"
describe('SOAP API Testing - FULL Flow Transaction', () => {
    beforeEach(() => {
        topup_v2.login(config.username, config.password, config.url_base);
    });
    it.skip('sign data RSA-SHA256', () => {


        // Sử dụng hàm ký trong mã chương trình của bạn
        // const data = username + '|' + password;
        const data = 'hello';
        // Đường dẫn đến tệp khóa bí mật RSA của bạn

        const signature = config.signDataWithRSA(data, config.privateKey);
        cy.log('Signature:' + signature);
        // verifySignDataWithPublicKey(data,signature,public_key);

    });
    it('execute download softpin - 1000 ', () => {

        cy.fixture("accData").then((accData) => {
            const token = accData.token;
            const rqID = config.getrequestId("HangPTDV_Download_");
            
            const data = config.username + '|' + rqID + '|' + token + '|' + '1000';
            // Đường dẫn đến tệp khóa bí mật RSA của bạn

            const signature = config.signDataWithRSA(data, config.privateKey);
            cy.log('Data DOWNLOAD:' + data);

            topup_v2.download(config.username, config.url_base, rqID, signature, config.keyBirthdayTime, token, '379', 1);

        });



    });

    it('Redownload transaction - 1100', () => {
        cy.fixture("userData").then((accData) => {
            const token = accData.token;
            const rqID = accData.rqDownloadID;


            const data = config.username + '|' + rqID + '|' + token + '|' + '1100';
            // Đường dẫn đến tệp khóa bí mật RSA của bạn

            const signature = config.signDataWithRSA(data, config.privateKey);
            cy.log('Data checktopup:' + data);
            cy.log('Signature checktopup:' + signature);

            topup_v2.redownload(config.username, config.url_base, rqID, signature, config.keyBirthdayTime, token)




        });
        

       

    });

    it.skip('execute topup - 1200 ', () => {

        cy.fixture("accData").then((accData) => {
            const token = accData.token;
            const rqID = config.getrequestId("HangPTDV_Topup_");

            const data = config.username + '|' + rqID + '|' + accData.token + '|' + '1200';
            // Đường dẫn đến tệp khóa bí mật RSA của bạn

            const signature = config.signDataWithRSA(data, config.privateKey);
            cy.log('Data TOPUP:' + data);
            cy.log('Signature TOPUP:' + signature);

            topup_v2.topup(config.username, config.url_base, rqID, signature, token, '0911235678', 'DataVinaMD', '26000');

        });
    });

    it.skip('Check topup transaction - 1300', () => {
        cy.fixture("userData").then((accData) => {
            const token = accData.token;
            const rqID = accData.rqTOPUPID;


            const data = config.username + '|' + rqID + '|' + token + '|' + '1300';
            // Đường dẫn đến tệp khóa bí mật RSA của bạn

            const signature = config.signDataWithRSA(data, config.privateKey);
            cy.log('Data checktopup:' + data);
            cy.log('Signature checktopup:' + signature);

            topup_v2.checktopup(config.username, config.url_base, rqID, signature, token)
            // topup_v2.topup(config.username,config.url_base, rqID , signature,token, '0911235678', 'DataVinaMD', '26000');
            // topup(username, privateKey, token, '0911235678', 'DataVinaMD', '26000');




        });
    });

});

