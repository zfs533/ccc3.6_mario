
export default ({ app }, inject) => {
    console.log("plugin customer init");

    var customerUrls = [];
    function setUrls(urls) {
        customerUrls = urls;
    }

    function getCustomerUrl() {
        return customerUrls[Math.floor(Math.random() * customerUrls.length)];
    }

    inject("customer", {
        setUrls,
        getCustomerUrl
    });
};