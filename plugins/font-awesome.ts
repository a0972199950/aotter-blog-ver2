import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera, faEye, faPlusCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faCamera, 
    faEye, 
    faPlusCircle, 
    faFacebook, 
    faTwitter, 
    faInstagram,
    faCommentDots
);

Vue.component('font-awesome-icon', FontAwesomeIcon)