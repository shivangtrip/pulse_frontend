import Ember from 'ember';

export default Ember.Route.extend({
    router: Ember.inject.service('-routing'),
    user : Ember.inject.service('userService'),
    firstTime : true,
    beforeModel() {
        this._super(...arguments);
        var isCookieSet = false;
        isCookieSet = this.checkCookie();
        if(!isCookieSet){
            this.replaceWith('404');
        }
        
            this.replaceWith('dashboard.overview');
        
    },
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    checkCookie() {
        var username = this.getCookie("splitUserId");
        if (username != "") {
            return true;
        } return false;
    },
    actions : {
        logoutUser() {
            document.cookie = "splitUserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            this.router.transitionTo('login');
        },
        loadOverview (){}
    }
});
