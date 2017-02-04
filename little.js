var config = {
  'containerId': 'buy-little-emotions-button',
  'initialText': 'Download for $2',
  'initialAction': function() {
    $("#buy-little-emotions .receipt-line").removeClass('hidden');
  },
  'defaultStepActionText': 'Next',
  'steps': [
    {
      'icon': 'email',
      'maxLength': 16,
      'name': 'Email address',
      'value': '',
      'placeholder': 'Enter your email...',
      'action': function(data) {
        console.log(data);
      },
      'previewStyle': 'icon'
    },
    {
      'icon': 'face',
      'maxlength': 5,
      'name': 'Name',
      'value': '',
      'placeholder': 'Your name',
      'action': function(data) {
        console.log(data);
      },
      'previewStyle': 'icon'
    }
  ],
  'finaliseAction': function() {
    $("#buy-little-emotions .receipt-line").html("<a>Request email receipt</a>");
  },
  'successText': '<i class="material-icons">file_download</i> Download',
  'successAction': function() {
    // TODO: Add the download action
    return true;
  }
}

$( document ).ready(function() {
  var littlEmoBuyButton = new onebutton(config);
  littlEmoBuyButton.create();
});
