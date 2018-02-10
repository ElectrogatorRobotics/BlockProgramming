var RunTimer, x, DriveSpeedL, DriveSpeedR, SlideSpeed, hue, colorHSV, sat, val, colorRGB, _7BnormalizedColorsVariable_7D, PositionLeft, PositionRight, twoFoot;

/**
 * Describe this function...
 */
function do_something() {
  while (linearOpMode.opModeIsActive()) {
    colorRGB = colorAccess.rgbToColor(JewelcolorsensorasLynxI2cColorRangeSensor.getRed(), JewelcolorsensorasLynxI2cColorRangeSensor.getGreen(), JewelcolorsensorasLynxI2cColorRangeSensor.getBlue());
    if (colorRGB.Red > 150 && colorRGB.Blue < 150) {
      telemetry.addTextData('Color', String('RED'));
      x = -1;
    } else if (colorRGB.Red < 150 && colorRGB.Blue > 150) {
      telemetry.addTextData('Color', String('BLUE'));
      x = 1;
    } else {
      telemetry.addTextData('Color', String('UNKNOWN'));
      x = 0;
    }
    telemetry.addTextData('RED', String(colorRGB.Red));
    telemetry.addTextData('BLUE', String(colorRGB.Blue));
    telemetry.addTextData('GREEN', String(colorRGB.Green));
    telemetry.update();
  }
  return x;
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
function RaiseLift() {
  elapsedTimeAccess.reset(RunTimer);
  liftmotor1.setDualPower(1, liftmotor2, 1);
  while (elapsedTimeAccess.getMilliseconds(RunTimer) < 1000 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('LiftTimer', String(RunTimer));
    telemetry.update();
  }
  liftmotor1.setDualPower(0, liftmotor2, 0);
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
function setGripClose() {
  rightclaw.setPosition(0.4);
  leftclaw.setPosition(0.4);
}

/**
 * Describe this function...
 */
function setGrip() {
  rightclaw.setDirection("FORWARD");
  leftclaw.setDirection("REVERSE");
  rightclaw.setPosition(0.85);
  leftclaw.setPosition(0.85);
}

/**
 * Describe this function...
 */
function MotorResetPosition() {
  frontrightdrive.setDualMode("STOP_AND_RESET_ENCODER", frontleftdrive, "STOP_AND_RESET_ENCODER");
  backleftdrive.setDualMode("STOP_AND_RESET_ENCODER", backrightdrive, "STOP_AND_RESET_ENCODER");
}

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
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  MotorResetPosition();
  setGrip();
  SetupLift();
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
  linearOpMode.waitForStart();
  setGripClose();
  RaiseLift();
  InitMotors();
  MotorTargPos(1900, 1900);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() < 1800 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  MotorResetPosition();
  InitMotors();
  setGripOpen();
  MotorTargPos(-100, -100);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() > -100 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  MotorResetPosition();
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


InitMotors();
MotorTargPosSlide(1500, 1500);
MotorSlide(1);
while (frontleftdrive.getCurrentPosition() < 1500 && linearOpMode.opModeIsActive()) {
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
}

InitMotors();
MotorTargPosSlide(-200, -200);
MotorSlide(1);
while (frontleftdrive.getCurrentPosition() > -200 && linearOpMode.opModeIsActive()) {
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
}
MotorSlide(0);
