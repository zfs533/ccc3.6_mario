const appLoading = document.querySelector('.appLoading');

const pageMixin = {
    data() {
        return {
            isPage: false,
            scrollViews: []
        };
    },
    created() {
        if (this.$parent.$parent.layoutName) {
            this.isPage = true;
        }
        // if (appLoading) {
        //     if (this.$route && this.$route.path !== "/") {
        //         if (appLoading.style.display !== "none") {
        //             appLoading.style.display = "none";
        //             appLoading.remove();
        //         }
        //     }
        // } 
        let pageRoot = document.querySelector("#app ." + this.$route.name);
        if (pageRoot) pageRoot.style.visibility = 'visible';

        if (this.isPage) {
            document.documentElement.style.backgroundImage = "unset";
            document.documentElement.style.backgroundColor = this.$env.options.themeColor;
            document.body.style.backgroundColor = this.$env.options.themeColor;
        }
    },
    activated() {
        let pageRoot = document.querySelector("#app ." + this.$route.name);
        if (pageRoot) {
            pageRoot.style.visibility = 'visible';
        }
        if (this.isPage) {
            document.documentElement.style.backgroundImage = "unset";
            document.documentElement.style.backgroundColor = this.$env.options.themeColor;
            document.body.style.backgroundColor = this.$env.options.themeColor;
            if (this.scrollViews && this.scrollViews.length > 0) {
                for (const scrollData of this.scrollViews) {
                    if (scrollData.scrollTop > 0) {
                        scrollData.view.scrollTop = scrollData.scrollTop;
                    }
                }
            }
        }
    },
    deactivated() {
        if (this.isPage) {
            document.documentElement.style.backgroundImage = "unset";
            document.documentElement.style.backgroundColor = this.$env.options.themeColor;
            document.body.style.backgroundColor = this.$env.options.themeColor;

            let scrollViews = document.querySelectorAll(".scroll-container");
            for (const scrollView of scrollViews) {
                this.scrollViews.push({
                    view: scrollView,
                    scrollTop: scrollView.scrollTop
                });
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        let root = document.querySelector("#app ." + from.name);
        if (root) root.style.visibility = 'hidden';
        next();
    }
};

export {
    pageMixin
};