var RunTimer, x, DriveSpeedL, DriveSpeedR, SlideSpeed, hue, colorHSV, sat, val, colorRGB, _7BnormalizedColorsVariable_7D, PositionLeft, PositionRight, _7BelapsedTimeVariable_7D, Left, Right, Power;

/**
 * Describe this function...
 */
function InitMotors() {
  frontrightdrive.setDualMode("RUN_TO_POSITION", frontleftdrive, "RUN_TO_POSITION");
  backleftdrive.setDualMode("RUN_TO_POSITION", backrightdrive, "RUN_TO_POSITION");
  backrightdrive.setDirection("REVERSE");
  frontrightdrive.setDirection("REVERSE");
}

/**
 * Describe this function...
 */
function MotorResetPosition() {
  frontrightdrive.setDualMode("STOP_AND_RESET_ENCODER", frontleftdrive, "STOP_AND_RESET_ENCODER");
  backleftdrive.setDualMode("STOP_AND_RESET_ENCODER", backrightdrive, "STOP_AND_RESET_ENCODER");
  MotorSlide(0);
}

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  setGrip();
  SetupLift();
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
  linearOpMode.waitForStart();
  setGripClose();
  RaiseLift();
  DriveStraight();
  Turn();
  DriveStraight2();
  setGripOpen();
  Backup();
}

/**
 * Describe this function...
 */
function MotorTargPos(PositionLeft, PositionRight) {
  frontleftdrive.setDualTargetPosition(PositionLeft, backleftdrive, PositionLeft);
  frontrightdrive.setDualTargetPosition(PositionRight, backrightdrive, PositionRight);
}

/**
 * Describe this function...
 */
function MotorStraight(DriveSpeedL, DriveSpeedR) {
  frontleftdrive.setDualPower(DriveSpeedL, backleftdrive, DriveSpeedL);
  frontrightdrive.setDualPower(DriveSpeedR, backrightdrive, DriveSpeedR);
}

/**
 * Describe this function...
 */
function MotorSlide(SlideSpeed) {
  frontrightdrive.setDualPower(-SlideSpeed, backrightdrive, SlideSpeed);
  backleftdrive.setDualPower(-SlideSpeed, frontleftdrive, SlideSpeed);
}

/**
 * Describe this function...
 */
function SetupLift() {
  liftmotor1.setDirection("FORWARD");
  liftmotor2.setDirection("REVERSE");
  liftmotor1.setDualMode("RUN_WITHOUT_ENCODER", liftmotor2, "RUN_WITHOUT_ENCODER");
}

/**
 * Describe this function...
 */
function setGripClose() {
  rightclaw.setPosition(0.4);
  leftclaw.setPosition(0.4);
}

/**
 * Describe this function...
 */
function MotorTargPosSlide(PositionLeft, PositionRight) {
  frontleftdrive.setDualTargetPosition(PositionLeft, backleftdrive, -PositionLeft);
  frontrightdrive.setDualTargetPosition(-PositionRight, backrightdrive, PositionRight);
}

/**
 * Describe this function...
 */
function setGripOpen() {
  rightclaw.setPosition(0.64);
  leftclaw.setPosition(0.64);
}

/**
 * Describe this function...
 */
function RaiseLift() {
  elapsedTimeAccess.reset(RunTimer);
  while (elapsedTimeAccess.getMilliseconds(RunTimer) < 1500 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('LiftTimer', String(RunTimer));
    telemetry.update();
  }
  liftmotor1.setDualPower(1, liftmotor2, 1);
  elapsedTimeAccess.reset(RunTimer);
  while (elapsedTimeAccess.getMilliseconds(RunTimer) < 1000 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('LiftTimer', String(RunTimer));
    telemetry.update();
  }
  liftmotor1.setDualPower(0, liftmotor2, 0);
}

/**
 * Describe this function...
 */
function setGrip() {
  rightclaw.setDirection("FORWARD");
  leftclaw.setDirection("REVERSE");
  rightclaw.setPosition(0.49);
  leftclaw.setPosition(0.49);
}

/**
 * Describe this function...
 */
function DriveStraight() {
  MotorResetPosition();
  InitMotors();
  MotorTargPos(2100, 2100);
  MotorStraight(0.5, 0.5);
  while (frontleftdrive.getCurrentPosition() < 2100 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
}

/**
 * Describe this function...
 */
function Turn() {
  MotorResetPosition();
  InitMotors();
  MotorTargPos(1300, -1300);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() < 1300 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
}

/**
 * Describe this function...
 */
function DriveStraight2() {
  MotorResetPosition();
  InitMotors();
  MotorTargPos(850, 850);
  MotorStraight(0.5, 0.5);
  while (frontleftdrive.getCurrentPosition() < 850 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
}

/**
 * Describe this function...
 */
function Backup() {
  MotorResetPosition();
  InitMotors();
  MotorTargPos(-200, -200);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() > -200 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
}
