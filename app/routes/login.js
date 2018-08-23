import Ember from 'ember';

export default Ember.Route.extend({
    user : Ember.inject.service('userService'),
    beforeModel() {
        this._super(...arguments);
        var isCookieSet = false;
        isCookieSet = this.checkCookie();
        if(isCookieSet){
            this.replaceWith('dashboard');
        }
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
    }
});
