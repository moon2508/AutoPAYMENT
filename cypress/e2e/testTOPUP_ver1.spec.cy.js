import config from "./config/config";
import topup_v2 from "./config/topup_v2"
import topup_v1 from "./config/topup_v1"
describe('API TOPUP version 1.4', () => {
    beforeEach(() => {
        topup_v2.login(config.username, config.password, config.url_base_v1);
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
    it.skip('execute download softpin ', () => {

        cy.fixture("accData").then((accData) => {
            const token = accData.token;
            const rqID = config.getrequestId("HangPTDV_Download_");
            topup_v1.download_v1(config.username, config.url_base_v1, rqID,  config.keyBirthdayTime, token,'379', 1)
        });

    });

    it.skip('Redownload transaction ', () => {
        cy.fixture("userData").then((accData) => {
            const token = accData.token;
            const rqID = accData.rqDownloadID;
            topup_v1.redownload_v1(config.username, config.url_base_v1, rqID, config.keyBirthdayTime, token);

        });
    });

    it('execute topup  ', () => {

        cy.fixture("accData").then((accData) => {
            const token = accData.token;
            const rqID = config.getrequestId("HangPTDV_Topup_");
            topup_v1.topup_v1(config.username, config.url_base_v1, rqID, token, '0911235678', 'DataVinaMD', '26000');

        });
    });

    it('Check topup transaction', () => {
        cy.fixture("userData").then((accData) => {
            const token = accData.token;
            const rqID = accData.rqTOPUPID;
            topup_v1.checktopup_v1(config.username, config.url_base_v1, rqID, token)
      
        });
    });

});

