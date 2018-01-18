var RunTimer, x, DriveSpeedL, DriveSpeedR;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  InitMotors();
  linearOpMode.waitForStart();
  while (RunTimer < 10 && linearOpMode.opModeIsActive()) {
    MotorSpeed(1, 1);
    telemetry.addTextData('RunTimer', String(RunTimer));
    telemetry.update();
  }
}

/**
 * Describe this function...
 */
function MotorSpeed(DriveSpeedL, DriveSpeedR) {
  frontrightdrive.setDualPower(DriveSpeedR, backrightdrive, DriveSpeedR);
  frontleftdrive.setDualPower(DriveSpeedL, backleftdrive, DriveSpeedL);
}

/**
 * Describe this function...
 */
function InitMotors() {
  frontrightdrive.setDualMode("RUN_USING_ENCODER", frontleftdrive, "RUN_USING_ENCODER");
  backleftdrive.setDualMode("RUN_USING_ENCODER", backrightdrive, "RUN_USING_ENCODER");
  backrightdrive.setDirection("REVERSE");
  frontrightdrive.setDirection("REVERSE");
}
