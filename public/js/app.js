'use strict';

$(document).ready(function() {


  watchForm();
  
  $('#ticket_submit').click(function(e) {
    e.preventDefault();
    submitForm();
  });

});

function watchForm() {
  // sets event watcher on the input for front end pre-validation
  // calls validation function
  $('input').keyup(function() {
    let id = $(this).attr('id');
    validateInput($(this), id);
  });

}

function validateInput(input, id) {
  // input is a jquery object
  let errMsg;
  let val = input.val();

  let validate = function(element) {
    // removes red border and hides error messages on the DOM
    element.css({'border-color': 'black', 'border-width': '1px'});
    element.next('span').text('');
    element.next('span').addClass('hidden');
  };

  let errorMessage = function(node, msg, wth) {
    // adds waring styles to input and shows error message
    node.css({'border-color': 'red', 'border-width': wth});
    node.next('span').text(msg);
    node.next('span').removeClass('hidden');
  };

  let invalidate = function(e, w, len, bool) {
    // checks length and formats error messages
    // bool is true if phone number is passed in and length must match exactly
    if (len === undefined) {
      // no minimum length for email
      errorMessage(e, errMsg);
    } else {
      if (bool === true) {
        if (val.length !== len) {
          errMsg = `Please enter ${len} characters`;
          errorMessage(e, errMsg, w);
        }
      } else {
        if (val.length < len) {
          errMsg = `Please enter at least ${len} character${len > 1 ? 's' : ''}`;
          errorMessage(e, errMsg, w);
        } else {
          validate(e);
        } 
      }
    }
  };


  let isNum = function(e, w, l) {
    // custom validation for number inputs (type="text")
    // calls validate if input is valid
    invalidate(e, w, l, true);
    for (let i = 0; i < val.length; i++) {
      if ( !($.isNumeric(val[i])) ) { 
        errMsg = 'Please enter only numbers';
        // invalidate(e, w, l, true);
        errorMessage(e, errMsg);
        // return;
        return invalidate(e, w, l, true);
      }
    }
    if (val.length === l) {
      validate(e);
    }
  };

  let isEmail = function(n) {
    // custom validation for email
    // regex does basic check for email string
    let result = false;

    if ( (val.match(/\w+@\w+\.\w{2,}/) !== null) && (val.indexOf('.') >= 1) && (val.indexOf('@') >= 1) ) {
      result = true;
    }

    if (result === true) {
      validate(input);
    } else {
      errMsg = 'Please enter a valid email address';
      errorMessage(n, errMsg);
    }
  };


  // initial validation is called based on input id
  switch (id) {
  case 'email':
    invalidate(input, '5px');
    isEmail(input);
    break;
  case 'area_code':
    isNum(input, '5px', 3);
    break;
  case 'prefix':
    isNum(input, '5px', 3);
    break;
  case 'last_four':
    isNum(input, '5px', 4);
    break;
  default:
    invalidate(input, '5px', 1);
    break;

  }

}


function submitForm() {

  let first = $('#first_name').val();
  let last = $('#last_name').val();
  let email = $('#email').val();
  let areaCode = $('#area_code').val();
  let prefix = $('#prefix').val();
  let lastFour = $('#last_four').val();

  console.log(first + ' ' + last + ' ' + email + ' (' + areaCode + ') ' + prefix + '-' + lastFour );
}