var vuMarkResult;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  vuforiaAccess.initializeExtended("CzechWolf", "BACK", true, true, "AXES", 0, 0, 0, 0, 0, 0, true);
  telemetry.addTextData('VuMark Example', String('Press start to continue...'));
  telemetry.update();
  linearOpMode.waitForStart();
  vuforiaAccess.activate();
  while (linearOpMode.opModeIsActive()) {
    vuMarkResult = JSON.parse(vuforiaAccess.track("RELIC"));
    if (vuMarkResult.IsVisible) {
      telemetry.addTextData('VuMark', String('A VuMark is visible.'));
      if (vuMarkResult.RelicRecoveryVuMark == "LEFT") {
        telemetry.addTextData('Relic Target', String('Go for the LEFT goal!'));
      } else if (vuMarkResult.RelicRecoveryVuMark == "CENTER") {
        telemetry.addTextData('Relic Target', String('Go for the CENTER goal!'));
      } else if (vuMarkResult.RelicRecoveryVuMark == "RIGHT") {
        telemetry.addTextData('Relic Target', String('Go for the RIGHT goal!'));
      } else {
        telemetry.addTextData('Relic Target', String('VuMark of UNKNOWN type...'));
      }
    } else {
      telemetry.addTextData('VuMark', String('No VuMarks are visible.'));
    }
    telemetry.update();
  }
  vuforiaAccess.deactivate();
}
