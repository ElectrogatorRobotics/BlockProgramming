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
  frontrightdrive.setDualPower(DriveSpeedL, backrightdrive, DriveSpeedL);
  frontleftdrive.setDualPower(DriveSpeedR, backleftdrive, DriveSpeedR);
}

/**
 * Describe this function...
 */
function InitMotors() {
  frontrightdrive.setDualMode("RUN_WITHOUT_ENCODER", frontleftdrive, "RUN_WITHOUT_ENCODER");
  backleftdrive.setDualMode("RUN_WITHOUT_ENCODER", backrightdrive, "RUN_WITHOUT_ENCODER");
  backleftdrive.setDirection("REVERSE");
  frontrightdrive.setDirection("REVERSE");
}
