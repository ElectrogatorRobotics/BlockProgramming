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
  telemetryAddTextData('MotorPositionL', frontleftdrive.getCurrentPosition());
  telemetryAddTextData('MotorPositionR', frontrightdrive.getCurrentPosition());
  telemetry.update();
  linearOpMode.waitForStart();
  deploylegs();
  slide();
  deploylegs2();
  DriveStraight(2100);
  Turn();
  DriveStraight(2100);
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
function deploylegs() {
  frontleftservo.setDirection("FORWARD");
  frontrightservo.setDirection("FORWARD");
  backleftservo.setDirection("FORWARD");
  backrightservo.setDirection("FORWARD");
  backrightservo.setPosition(0.3);
  backleftservo.setPosition(0.3);
  while (backrightservo.getPosition() > 0.4) {
    telemetry.addNumericData('Position', backrightservo.getPosition());
  }
  frontrightservo.setPosition(0.3);
  frontleftservo.setPosition(0.3);
  while (frontleftservo.getPosition() > 0.35) {
    telemetry.addNumericData('Position', frontleftservo.getPosition());
  }
}

/**
 * Describe this function...
 */
function deploylegs2() {
  frontleftservo.setDirection("FORWARD");
  frontrightservo.setDirection("FORWARD");
  backleftservo.setDirection("FORWARD");
  backrightservo.setDirection("FORWARD");
  backrightservo.setPosition(0.2);
  backleftservo.setPosition(0.2);
  frontrightservo.setPosition(0.2);
  frontleftservo.setPosition(0.2);
  while (frontleftservo.getPosition() > 0.25) {
    telemetry.addNumericData('Position', frontleftservo.getPosition());
  }
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
function RaiseLift() {
  elapsedTimeAccess.reset(RunTimer);
  while (elapsedTimeAccess.getMilliseconds(RunTimer) < 1500 && linearOpMode.opModeIsActive()) {
    telemetryAddTextData('LiftTimer', RunTimer);
    telemetry.update();
  }
  liftmotor1.setDualPower(1, liftmotor2, 1);
  elapsedTimeAccess.reset(RunTimer);
  while (elapsedTimeAccess.getMilliseconds(RunTimer) < 1000 && linearOpMode.opModeIsActive()) {
    telemetryAddTextData('LiftTimer', RunTimer);
    telemetry.update();
  }
  liftmotor1.setDualPower(0, liftmotor2, 0);
}

/**
 * Describe this function...
 */
function DriveStraight(x) {
  MotorResetPosition();
  InitMotors();
  MotorTargPos(x, x);
  MotorStraight(0.5, 0.5);
  while (frontleftdrive.getCurrentPosition() < x && linearOpMode.opModeIsActive()) {
    telemetryAddTextData('MotorPositionL', frontleftdrive.getCurrentPosition());
    telemetryAddTextData('MotorPositionR', frontrightdrive.getCurrentPosition());
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
    telemetryAddTextData('MotorPositionL', frontleftdrive.getCurrentPosition());
    telemetryAddTextData('MotorPositionR', frontrightdrive.getCurrentPosition());
    telemetry.update();
  }
  MotorSlide(0);
}

/**
 * Describe this function...
 */
function DriveStraight2() {
  x = 2100;
  MotorResetPosition();
  InitMotors();
  MotorTargPos(x, x);
  MotorStraight(0.25, 0.25);
  while (frontleftdrive.getCurrentPosition() < 800 && linearOpMode.opModeIsActive()) {
    telemetryAddTextData('MotorPositionL', frontleftdrive.getCurrentPosition());
    telemetryAddTextData('MotorPositionR', frontrightdrive.getCurrentPosition());
    telemetry.update();
  }
  MotorSlide(0);
}

/**
 * Describe this function...
 */
function slide() {
  MotorResetPosition();
  InitMotors();
  MotorTargPosSlide(100, 100);
  MotorSlide(1);
  while (frontleftdrive.getCurrentPosition() < 100 && linearOpMode.opModeIsActive()) {
    telemetryAddTextData('MotorPositionL', frontleftdrive.getCurrentPosition());
    telemetryAddTextData('MotorPositionR', frontrightdrive.getCurrentPosition());
    telemetry.update();
  }
  MotorSlide(0);
}
