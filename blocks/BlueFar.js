var RunTimer, x, DriveSpeedL, DriveSpeedR, SlideSpeed, hue, colorHSV, sat, val, colorRGB, _7BnormalizedColorsVariable_7D, PositionLeft, PositionRight;

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
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  MotorResetPosition();
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
  linearOpMode.waitForStart();
  InitMotors();
  MotorTargPos(1400, 1400);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() < 1400 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  MotorResetPosition();
  InitMotors();
  MotorTargPosSlide(1400, 1400);
  MotorSlide(1);
  while (frontleftdrive.getCurrentPosition() < 1400 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  MotorResetPosition();
  InitMotors();
  MotorTargPos(500, 500);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() < 500 && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
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
 * Describe this function...
 */
function MotorResetPosition() {
  frontrightdrive.setDualMode("STOP_AND_RESET_ENCODER", frontleftdrive, "STOP_AND_RESET_ENCODER");
  backleftdrive.setDualMode("STOP_AND_RESET_ENCODER", backrightdrive, "STOP_AND_RESET_ENCODER");
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
function MotorTargPosSlide(PositionLeft, PositionRight) {
  frontleftdrive.setDualTargetPosition(PositionLeft, backleftdrive, -PositionLeft);
  frontrightdrive.setDualTargetPosition(-PositionRight, backrightdrive, PositionRight);
}


InitMotors();
MotorTargPosSlide(1500, 1500);
MotorSlide(1);
while (frontleftdrive.getCurrentPosition() < 1500 && linearOpMode.opModeIsActive()) {
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
}
