var vuMarkResult, vuMarkReturn;

/**
 * Describe this function...
 */
function InitVisionSystem() {
  vuforiaAccess.initializeExtended("CzechWolf", "BACK", true, true, "NONE", 0, 0, 0, 0, 0, 0, true);
  vuMarkResult = JSON.parse(vuforiaAccess.track("RELIC"));
}

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
}

/**
 * Describe this function...
 */
function GetVisionCode() {
  vuforiaAccess.activate();
  if (vuMarkResult.IsVisible) {
    telemetry.addTextData('VuMark', String('A VuMark is visible.'));
    if (vuMarkResult.RelicRecoveryVuMark == "LEFT") {
      telemetry.addTextData('Relic Target', String('Go for the LEFT goal!'));
      vuMarkResult = -1;
    } else if (vuMarkResult.RelicRecoveryVuMark == "CENTER") {
      telemetry.addTextData('Relic Target', String('Go for the CENTER goal!'));
      vuMarkResult = 0;
    } else if (vuMarkResult.RelicRecoveryVuMark == "RIGHT") {
      telemetry.addTextData('Relic Target', String('Go for the RIGHT goal!'));
      vuMarkResult = 1;
    } else {
      telemetry.addTextData('Relic Target', String('VuMark of UNKNOWN type...'));
      vuMarkResult = 1000;
    }
  } else {
    telemetry.addTextData('VuMark', String('No VuMarks are visible.'));
    vuMarkResult = 1000;
  }
  telemetry.update();
  vuforiaAccess.deactivate();
  return vuMarkReturn;
}
