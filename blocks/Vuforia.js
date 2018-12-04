var vuMarkResult, vuMarkReturn, VUResults;

/**
 * Describe this function...
 */
function InitVisionSystem() {
  vuforiaAccess.initializeExtended("CzechWolf", "BACK", true, true, "NONE", 0, 0, 0, 0, 0, 0, true);
  vuMarkResult = JSON.parse(vuforiaAccess.track("RELIC"));
}

/**
 * Describe this function...
 */
function GetVisionCode() {
  vuMarkReturn = 0;
  vuforiaAccess.activate();
  if (vuMarkResult.IsVisible) {
    telemetry.addTextData('VuMark', String('A VuMark is visible.'));
    if (vuMarkResult.RelicRecoveryVuMark == "LEFT") {
      telemetry.addTextData('Relic Target', String('Go for the LEFT goal!'));
      vuMarkReturn = -1;
    } else if (vuMarkResult.RelicRecoveryVuMark == "CENTER") {
      telemetry.addTextData('Relic Target', String('Go for the CENTER goal!'));
      vuMarkReturn = 0;
    } else if (vuMarkResult.RelicRecoveryVuMark == "RIGHT") {
      telemetry.addTextData('Relic Target', String('Go for the RIGHT goal!'));
      vuMarkReturn = 1;
    } else {
      telemetry.addTextData('Relic Target', String('VuMark of UNKNOWN type...'));
      vuMarkReturn = 1000;
    }
  } else {
    telemetry.addTextData('VuMark', String('No VuMarks are visible.'));
    vuMarkResult = 1000;
  }
  telemetry.update();
  vuforiaAccess.deactivate();
  return vuMarkReturn;
}

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  InitVisionSystem();
  linearOpMode.waitForStart();
  VUResults = GetVisionCode();
  telemetry.addTextData('PostVUCode value: ', String(VUResults));
  linearOpMode.sleep(30000);
}
