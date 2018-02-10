var Distance, x;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  while (linearOpMode.opModeIsActive()) {
    Drive_Forward();
  }
  Turn_Right();
}

/**
 * Describe this function...
 */
function Drive_Forward() {
  frontleftdrive.setDualPower(0.5, frontrightdrive, 0.5);
  backleftdrive.setDualPower(0.5, backrightdrive, 0.5);
  frontrightdrive.setDualTargetPosition(499, frontleftdrive, 499);
  backrightdrive.setDualTargetPosition(499, backleftdrive, 499);
  frontrightdrive.setDualMode("RUN_TO_POSITION", frontleftdrive, "RUN_TO_POSITION");
  backleftdrive.setDualMode("RUN_TO_POSITION", backrightdrive, "RUN_TO_POSITION");
}

/**
 * Describe this function...
 */
function Turn_Right() {
  frontleftdrive.setDualPower(0.5, frontrightdrive, 0.5);
  frontleftdrive.setDualTargetPosition(699, backleftdrive, 699);
  frontrightdrive.setDualTargetPosition(-699, backrightdrive, -699);
}


frontrightdrive.isBusy();

backleftdrive.setMode("STOP_AND_RESET_ENCODER");
frontleftdrive.setMode("STOP_AND_RESET_ENCODER");
backrightdrive.setMode("STOP_AND_RESET_ENCODER");
frontrightdrive.setMode("STOP_AND_RESET_ENCODER");

backleftdrive.setDirection("FORWARD");
backrightdrive.setDirection("REVERSE");
frontleftdrive.setDirection("FORWARD");
frontrightdrive.setDirection("REVERSE");
