import Ember from 'ember';

export default Ember.Service.extend({
    userUID: null,
    setUser(item) {
        this.set('userUID', item);
    }
});
