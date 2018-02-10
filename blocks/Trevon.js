var RunTimer, x, DriveSpeedL, DriveSpeedR, _7BaccelerationVariable_7D, Timer, _7BelapsedTimeVariable_7D;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("MILLISECONDS");
  InitMotors();
  InitClaw();
  linearOpMode.waitForStart();
  elapsedTimeAccess.reset(RunTimer);
  while (RunTimer < 900 && linearOpMode.opModeIsActive()) {
    MotorSpeed(1, 1);
    telemetry.addTextData('RunTimer', String(RunTimer));
    telemetry.update();
  }
  elapsedTimeAccess.reset(RunTimer);
  while (RunTimer < 900 && linearOpMode.opModeIsActive()) {
    MotorSpeed(0.25, -0.25);
    telemetry.addTextData('RunTimer', String(RunTimer));
    telemetry.update();
  }
  elapsedTimeAccess.reset(RunTimer);
  while (RunTimer < 900 && linearOpMode.opModeIsActive()) {
    MotorSpeed(0.25, 0.25);
    telemetry.addTextData('RunTimer', String(RunTimer));
    telemetry.update();
  }
  OpenClaw();
}

/**
 * Describe this function...
 */
function InitMotors() {
  frontrightdrive.setDualMode("RUN_USING_ENCODER", frontleftdrive, "RUN_USING_ENCODER");
  backleftdrive.setDualMode("RUN_USING_ENCODER", backrightdrive, "RUN_USING_ENCODER");
  backrightdrive.setDualTargetPosition(420, backleftdrive, 420);
  frontrightdrive.setDualTargetPosition(420, frontleftdrive, 420);
  backleftdrive.setDirection("FORWARD");
  backrightdrive.setDirection("REVERSE");
  frontleftdrive.setDirection("FORWARD");
  frontrightdrive.setDirection("REVERSE");
}

/**
 * Describe this function...
 */
function InitClaw() {
  rightclaw.setDirection("REVERSE");
  rightclaw.setPosition(0.6);
  leftclaw.setPosition(0.6);
}

/**
 * Describe this function...
 */
function OpenClaw() {
  rightclaw.setPosition(0.64);
  leftclaw.setPosition(0.64);
}

/**
 * Describe this function...
 */
function CloseClaw() {
  rightclaw.setPosition(0.4);
  leftclaw.setPosition(0.4);
}

/**
 * Describe this function...
 */
function MotorSpeed(DriveSpeedL, DriveSpeedR) {
  frontrightdrive.setDualPower(DriveSpeedR, backrightdrive, DriveSpeedR);
  frontleftdrive.setDualPower(DriveSpeedL, backleftdrive, DriveSpeedL);
}
