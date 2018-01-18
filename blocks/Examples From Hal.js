var RunTimer, x, DriveSpeedL, DriveSpeedR, SlideSpeed;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  InitMotors();
  linearOpMode.waitForStart();
  while (RunTimer < 3 && linearOpMode.opModeIsActive()) {
    MotorStraight(1, 1);
    telemetry.addTextData('RunTimer', String(RunTimer));
    telemetry.update();
  }
}

/**
 * Describe this function...
 */
function InitMotors() {
  frontrightdrive.setDualMode("RUN_WITHOUT_ENCODER", frontleftdrive, "RUN_WITHOUT_ENCODER");
  backleftdrive.setDualMode("RUN_WITHOUT_ENCODER", backrightdrive, "RUN_WITHOUT_ENCODER");
  backrightdrive.setDirection("REVERSE");
  frontrightdrive.setDirection("REVERSE");
}

/**
 * Describe this function...
 */
function MotorStraight(DriveSpeedL, DriveSpeedR) {
  frontleftdrive.setDualPower(DriveSpeedL, backleftdrive, DriveSpeedL);
  frontleftdrive.setDualPower(DriveSpeedR, backleftdrive, DriveSpeedR);
}

/**
 * Describe this function...
 */
function MotorSlide(SlideSpeed) {
  frontrightdrive.setDualPower(-SlideSpeed, backrightdrive, SlideSpeed);
  backleftdrive.setDualPower(-SlideSpeed, frontleftdrive, SlideSpeed);
}
