onebutton = function(config) {
  this.config = config;
  this.create = function() {
    var self = this;
    // Generate the button html
    $('#' + this.config.containerId).html(self.generateButton());

    // Bind the events to the button
    self.initialiseEvents();
  };
  this.step = 1;
  this.nextStep = function() {

    if(this.step>this.config.steps.length) {
      var prevStep = this.config.steps[this.step-2];
      var prevStepClassName = toId(prevStep.name);


      $("#" + this.config.containerId + " .onebtn-button").addClass('onebtn-hidden');
      $('#' + this.config.containerId + ' .onebtn-preview').addClass('onebtn-hidden');
      $('#' + this.config.containerId + ' .onebtn-input-wrapper').addClass('onebtn-hidden');

      var self = this;
      $("#" + self.config.containerId + " .onebtn-button-wrapper").animate({
        width: "50px"
      }, 500, function() {
        // Animation complete.
      });

      $("#" + self.config.containerId + " .onebtn-button").empty();
      $("#" + self.config.containerId + " .processing").removeClass('onebtn-hidden');

      setTimeout(function () {

        $("#" + self.config.containerId + " .onebtn-inner").animate({
          width: "150px",backgroundColor: "#44cc4f"
        }, 500, function() {
          // Animation complete.
          console.log("Finished");
          $("#" + self.config.containerId + " .onebtn-button").html(self.config.successText);
          $("#" + self.config.containerId + " .processing").addClass('onebtn-hidden');
          $("#" + self.config.containerId + " .onebtn-button").removeClass('onebtn-hidden');

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
          $("#" + this.config.containerId + " .onebtn-button").text(thisStep.actionText);
        }

        prevStep.value = $('.' + prevStepClassName  + ' input[type="text"]').val();
        prevStep.action(prevStep.value);

        if(prevStep.previewLength && (prevStep.previewStyle==='text') ) {
          $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').text(prevStep.value.substring(0, prevStep.previewLength));
        }
        else if (prevStep.previewStyle==='icon') {
          $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').html('<i class="material-icons onebtn-icon-subtle">' + prevStep.icon + '</i>');
        }
        else {
          $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').html('<i class="material-icons onebtn-icon-subtle">remove</i>');
        }

        $("#" + this.config.containerId + ' .' + prevStepClassName).addClass('onebtn-hidden');
        $("#" + this.config.containerId + ' .' + prevStepClassName + '-preview').removeClass('onebtn-hidden');

        $("#" + this.config.containerId + ' .' + thisStepClassName).removeClass('onebtn-hidden');
        $("#" + this.config.containerId + ' .' + thisStepClassName + " input").focus();
      }
      else {
        // expand button
        $("#" + this.config.containerId + " .onebtn-button-wrapper").animate({
          width: "90%"
        }, 500, function() {
          // Animation complete.
        });

        this.config.initialAction();

        if(thisStep.actionText) {
          $("#" + this.config.containerId + " .onebtn-button").text(thisStep.actionText);
        }
        else {
          $("#" + this.config.containerId + " .onebtn-button").text(this.config.defaultStepActionText);
        }

        $("#" + this.config.containerId + " ." + thisStepClassName).removeClass('onebtn-hidden');
        $("#" + this.config.containerId + " ." + thisStepClassName + " input").focus();
      }
    }

    this.step++;
  };
  this.initialiseEvents = function() {
    var self = this;
    $('#' + self.config.containerId).on('click', function(button) {
      $(this).addClass('onebtn-active');
      self.nextStep();
    });

    $('#' + self.config.containerId).on('keypress', function (e) {
      if(e.which === 13){
         //Disable textbox to prevent multiple submit
         $(this).attr("disabled", "disabled");
         //Do Stuff, submit, etc..
         self.nextStep();
      }
    });
  };
  this.generateButton = function() {
    var buttonHTML = '<div class="onebtn-inner">';

    this.config.steps.forEach(function(step) {
    // generate input
        buttonHTML += '<div class="onebtn-input-wrapper ' + toId(step.name) + ' onebtn-hidden animated zoomIn">';
        buttonHTML += '<div class="onebtn-input-icon"><i class="material-icons">' + step.icon + '</i></div>';
        buttonHTML += '<input type="text" name="' + toId(step.name) + '" value="" placeholder="' + step.placeholder + '">';
        buttonHTML += '</div>';

        // generate preview
        buttonHTML += '<div class="onebtn-preview ' + toId(step.name) + '-preview onebtn-hidden animated pulse">';
        buttonHTML += '</div>';
    });


    buttonHTML += '<div class="processing onebtn-hidden">';
    buttonHTML += '<img src="images/puff.svg" alt="" />';
    buttonHTML += '</div>';
    buttonHTML += '<div class="onebtn-button" >' + this.config.initialText + '</div>';
    buttonHTML += '</div>';
    buttonHTML += '</div>';

    return buttonHTML;
  }

}

function toId(name) {
  return name.toLowerCase().replace(' ', '-');
}
