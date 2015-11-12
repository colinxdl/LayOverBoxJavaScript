// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.

                //Retrieve our greetingOutput session state info, if it exists.
                var outputValue = WinJS.Application.sessionState.greetingOutput;
                if (outputValue) {
                    var greetingOutput = document.getElementById("greetingOutput");
                    greetingOutput.innertext = outputValue;
                }

            }
            args.setPromise(WinJS.UI.processAll().then(function completed(){
            
                //Retrive the div that hosts the Rating control.
               /* var ratingControlDiv = document.getElementById("ratingControlDiv");

                //Retrieve the actual rating control.
                var ratingControl = ratingControlDiv.winControl;

                //Register the event handler
                ratingControl.addEventListener("change", ratingChanged, false);*/

                //Retrieve the button and register our event handler.
                var submitButton = document.getElementById("submitButton");
                submitButton.addEventListener("click", buttonClickHandler, false);

                //Retrieve the input element and register our event handler.
                var hashtagCodeInput = document.getElementById("hashtagCodeInput");
                hashtagCodeInput.addEventListener("change", hashtagCodeInputChanged);

                //Restore app data.
                var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

                //Restore the hashtag code.
                var hashtagCode = roamingSettings.values["hashtagCode"];
                if (hashtagCode) {
                    hashtagCodeInput.value = hashtagCode;
                }


            }));

           
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function buttonClickHandler(eventInfo) {
        var hashtagCode = document.getElementById("hashtagCodeInput").value;
        var greetingString = "Your hastagcode is " + hashtagCode;
        document.getElementById("greetingOutput").innerText = greetingString;

        //Save the session data
        WinJS.Application.sessionState.greetingOutput = greetingString;
    }

    /*function ratingChanged(eventInfo) {
        var ratingOutput = document.getElementById("ratingOutput");
        ratingOutput.innerText = eventInfo.detail.tentativeRating;
    }*/

    function hashtagCodeInputChanged(eventInfo) {
        var hashtagCodeInput = eventInfo.srcElement;

        //Store the hashtag code for multiple sessions.
        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;
        roamingSettings.values["hashtagCode"] = hashtagCodeInput.value;
    }

    app.start();
})();
