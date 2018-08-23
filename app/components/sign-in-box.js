import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service('store'),
    ajax : Ember.inject.service(),
    user: Ember.inject.service('userService'),
    id: null,
    password: null,
    errorMessage: 'ID.',
    errorInSignIn: false,
    router: Ember.inject.service('-routing'),
    actions: {
        getLoginData() {
            //console.log(this.id,this.password);
            //var newUser = this.get('store').createRecord('user', {userId : this.id, userPw : this.password});
            //newUser.save();
            var userExists = false;
            var wrPass = false;
            var thisContext = this;
            this.set('errorInSignIn', false);
            this.get('store').findAll('user').then(function(dataFromQuery){
                
                
                var listOfIds = dataFromQuery.getEach('userId');
                var listOfUIDs = dataFromQuery.getEach('id');
                var cookieToSet = null;
                var len = listOfIds.length;
                
                for(var i=0; i<len;i++){
                    if(listOfIds[i]==thisContext.id){
                        if(thisContext.password=='fellow'){
                            userExists =true;
                            
                            cookieToSet = listOfUIDs[i];
                            break;
                        }
                        else {
                            wrPass = true;
                        }
                            
                    }
                    
                }
                if(userExists){
                    console.log('user logged in..');
                    document.cookie = "splitUserId="+cookieToSet;
                    thisContext.get('user').setUser(cookieToSet);
                    thisContext.get('router').transitionTo('dashboard');

                }
                else{
            
                    console.log('login failed..');
                    thisContext.set('id', null);
                    thisContext.set('password', null);
                    thisContext.set('errorMessage' , 'ID');
                    if(wrPass){
                        thisContext.set('errorMessage' , 'Password');
                    }
                    thisContext.set('errorInSignIn', true);
                }
            });
    },
    doPost() {
        return this.get('ajax').request ('/users/login', {
            method : 'POST' ,
            headers:  {'Content-Type': 'application/json'},
            data: JSON.stringify( { 'email' : 'shivang@pulse.com' , 'password' : 'testadmin'} )

    });
    },
    doLogin() {
        return this.get('ajax').request ('/users/login', {
            method : 'POST' ,
            headers:  {'Content-Type': 'application/json'},
            data: JSON.stringify( { 'email' : 'shivang@pulse.com' , 'password' : 'testadmin'} )

    });
    }
}

});
