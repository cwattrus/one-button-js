function onebutton(config) {
  this.config = config;
  this.create = function() {
    var self = this;

    $('.onebutton').each(function(index, button) {
      // Generate the button html
      $(button).html(self.generateButton());

      // Bind the events to the button
      self.initialiseEvents();
    });
  };
  this.step = 1;
  this.nextStep = function() {

    if(this.step>this.config.steps.length) {
      var prevStep = this.config.steps[this.step-2];
      var prevStepClassName = toId(prevStep.name);

      $("#" + this.config.containerId + " .start-buy").addClass("hidden");
      $('#' + this.config.containerId + ' .buy-preview').addClass("hidden");
      $('#' + this.config.containerId + ' .buy-input').addClass("hidden");

      var self = this;
      $("#" + this.config.containerId + " .buy-button-wrapper").animate({
        width: "50px"
      }, 500, function() {
        // Animation complete.
      });

      $("#" + this.config.containerId + " .processing").removeClass("hidden");

      setTimeout(function () {
        $("#" + self.config.containerId + " .buy-button-wrapper").animate({
          width: "150px",backgroundColor: "#44cc4f"
        }, 500, function() {
          // Animation complete.
          $("#" + self.config.containerId + " .start-buy").html(self.config.successText);
          $("#" + self.config.containerId + " .processing").addClass("hidden");
          $("#" + self.config.containerId + " .start-buy").removeClass("hidden");

          self.config.successAction();
        });

      }, 2000);
    }
    else {
      var thisStep = this.config.steps[this.step-1];
      var thisStepClassName = toId(thisStep.name);

      if(this.step>1) {

        var prevStep = this.config.steps[this.step-2];
        var prevStepClassName = toId(prevStep.name);

        if(thisStep.actionText) {
          $("#" + this.config.containerId + " .start-buy").text(thisStep.actionText);
        }

        prevStep.value = $('.' + prevStepClassName  + ' input[type="text"]').val();
        prevStep.action(prevStep.value);
        $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').text(prevStep.value.substring(0, prevStep.previewLength));
        $("#" + this.config.containerId + ' .' + prevStepClassName).addClass("hidden");
        $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').removeClass("hidden");

        $("#" + this.config.containerId + ' .' + thisStepClassName).removeClass("hidden");
        $("#" + this.config.containerId + ' .' + thisStepClassName + " input").focus();
      }
      else {
        // expand button
        $("#" + this.config.containerId + " .buy-button-wrapper").animate({
          width: "340px"
        }, 500, function() {
          // Animation complete.
        });

        this.config.initialAction();

        if(thisStep.actionText) {
          $("#" + this.config.containerId + " .start-buy").text(thisStep.actionText);
        }
        else {
          $("#" + this.config.containerId + " .start-buy").text(this.config.defaultStepActionText);
        }

        $("#" + this.config.containerId + " ." + thisStepClassName).removeClass("hidden");
        $("#" + this.config.containerId + " ." + thisStepClassName + " input").focus();
      }
    }

    this.step++;
  };
  this.initialiseEvents = function() {
    var self = this;
    $("#buy-little-emotions .start-buy").on("click", function() {
      self.nextStep();
    });
  };
  this.generateButton = function() {
    var buttonHTML = '<div class="buy-button-container">';
    buttonHTML += '<div class="buy-button-wrapper">';

    var step = this.config.steps[0];
    var buttonId = toId(step.name);

    // generate input
    buttonHTML += '<div class="buy-input ' + buttonId + ' hidden animated zoomIn">';
    buttonHTML += '<i class="material-icons">' + step.icon + '</i>';
    buttonHTML += '<input type="text" name="' + buttonId + '" value="" placeholder="' + step.placeholder + '">';
    buttonHTML += '</div>';

    // generate preview
    buttonHTML += '<div class="buy-preview ' + buttonId + '-preview hidden animated pulse">';
    buttonHTML += '</div>';

    buttonHTML += '<div class="buy-preview card-expiry-preview hidden animated pulse">';
    buttonHTML += '09/19';
    buttonHTML += '</div>';
    buttonHTML += '<div class="buy-input card-expiry hidden animated zoomIn">';
    buttonHTML += '<i class="material-icons">date_range</i>';
    buttonHTML += '<input type="text" name="name" value="" placeholder="MM/YY">';
    buttonHTML += '</div>';
    buttonHTML += '<div class="buy-input card-cvv hidden animated zoomIn">';
    buttonHTML += '<i class="material-icons">lock_outline</i>';
    buttonHTML += '<input type="text" name="name" value="" placeholder="•••">';
    buttonHTML += '</div>';
    buttonHTML += '<div class="processing hidden">';
    buttonHTML += '<img src="/images/puff.svg" alt="" />';
    buttonHTML += '</div>';
    buttonHTML += '<div class="button start-buy" >' + this.config.initialText + '</div>';
    buttonHTML += '</div>';
    buttonHTML += '</div>';

    return buttonHTML;
  }

}

function toId(name) {
  return name.toLowerCase().replace(' ', '-');
}
