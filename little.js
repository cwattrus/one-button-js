var config = {
  'containerId': 'buy-little-emotions-button',
  'initialText': 'Download $2',
  'initialAction': function() {
    $("#buy-little-emotions .receipt-line").removeClass('hidden');
  },
  'defaultStepActionText': 'Next',
  'steps': [
    {
      'icon': 'credit_card',
      'maxLength': 16,
      'name': 'Card number',
      'value': '',
      'placeholder': '•••• •••• •••• ••••',
      'action': function(data) {
        console.log(data);
      },
      'previewLength': 8
    },
    {
      'icon': 'date_range',
      'maxlength': 5,
      'name': 'Card Expiry',
      'value': '',
      'placeholder': 'MM/YY',
      'action': function(data) {
        console.log(data);
      },
      'previewLength': 5
    },
    {
      'icon': 'lock_outline',
      'maxlength': 3,
      'name': 'Card CVV',
      'value': '',
      'placeholder': '•••',
      'actionText': 'Buy',
      'action': function(data) {
        $("#buy-little-emotions .receipt-line").html("Preparing download");
      },
      'previewLength': 3
    }
  ],
  'finaliseAction': function() {
    $("#buy-little-emotions .receipt-line").html("<a>Request email receipt</a>");
  },
  'successText': '<i class="material-icons">file_download</i> download',
  'successAction': function() {
    // TODO: Add the download action
  }
}

$( document ).ready(function() {
  var littlEmoBuyButton = new onebutton(config);
  littlEmoBuyButton.create();
});
