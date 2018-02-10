var RunTimer, x, DriveSpeedL, DriveSpeedR, SlideSpeed, hue, colorHSV, sat, val, colorRGB, _7BnormalizedColorsVariable_7D, PositionLeft, PositionRight, TargetPosition, vuMarkResult, vuMarkReturn, VufTarget, Position, GripPosition;

/**
 * Describe this function...
 */
function SetupGrip() {
  rightclaw.setDirection("REVERSE");
  leftclaw.setDirection("FORWARD");
}

/**
 * Describe this function...
 */
function SetGripOpen() {
  leftclaw.setPosition(0.64);
  rightclaw.setPosition(0.64);
}

/**
 * Describe this function...
 */
function SetGripClosed() {
  leftclaw.setPosition(0.4);
  rightclaw.setPosition(0.4);
}

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  MotorResetPosition();
  InitVisionSystem();
  SetupGrip();
  VufTarget = GetVisionCode();
  TargetPosition = 4200;
  if (VufTarget < 2) {
    TargetPosition = TargetPosition + 800 * VufTarget;
  }
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
  linearOpMode.waitForStart();
  SetGripClosed();
  InitMotors();
  MotorTargPosSlide(TargetPosition, TargetPosition);
  MotorSlide(1);
  while (frontrightdrive.getCurrentPosition() < TargetPosition && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  MotorResetPosition();
  InitMotors();
  TargetPosition = 700;
  MotorTargPos(TargetPosition, TargetPosition);
  MotorStraight(1, 1);
  while (frontleftdrive.getCurrentPosition() < TargetPosition && linearOpMode.opModeIsActive()) {
    telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
    telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
    telemetry.update();
  }
  MotorSlide(0);
  SetGripOpen();
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
function InitVisionSystem() {
  vuforiaAccess.initializeExtended("CzechWolf", "BACK", true, true, "NONE", 0, 0, 0, 0, 0, 0, true);
  vuMarkResult = JSON.parse(vuforiaAccess.track("RELIC"));
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
function MotorTargPosSlide(PositionLeft, PositionRight) {
  frontleftdrive.setDualTargetPosition(PositionLeft, backleftdrive, -PositionLeft);
  frontrightdrive.setDualTargetPosition(-PositionRight, backrightdrive, PositionRight);
}

/**
 * Describe this function...
 */
function GetVisionCode() {
  vuforiaAccess.activate();
  if (vuMarkResult.IsVisible) {
    telemetry.addTextData('VuMark', String('A VuMark is visible.'));
    if (vuMarkResult.RelicRecoveryVuMark == "LEFT") {
      telemetry.addTextData('Relic Target', String('Go for the LEFT goal!'));
      vuMarkResult = -1;
    } else if (vuMarkResult.RelicRecoveryVuMark == "CENTER") {
      telemetry.addTextData('Relic Target', String('Go for the CENTER goal!'));
      vuMarkResult = 0;
    } else if (vuMarkResult.RelicRecoveryVuMark == "RIGHT") {
      telemetry.addTextData('Relic Target', String('Go for the RIGHT goal!'));
      vuMarkResult = 1;
    } else {
      telemetry.addTextData('Relic Target', String('VuMark of UNKNOWN type...'));
      vuMarkResult = 1000;
    }
  } else {
    telemetry.addTextData('VuMark', String('No VuMarks are visible.'));
    vuMarkResult = 1000;
  }
  telemetry.update();
  vuforiaAccess.deactivate();
  return vuMarkReturn;
}

/**
 * Describe this function...
 */
function MotorSlide(SlideSpeed) {
  frontrightdrive.setDualPower(-SlideSpeed, backrightdrive, SlideSpeed);
  backleftdrive.setDualPower(-SlideSpeed, frontleftdrive, SlideSpeed);
}


MotorTargPos(TargetPosition, TargetPosition);
MotorStraight(1, 1);
while (frontleftdrive.getCurrentPosition() < TargetPosition && linearOpMode.opModeIsActive()) {
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
}
MotorSlide(0);
MotorResetPosition();
InitMotors();
TargetPosition = 1500;
MotorTargPos(-TargetPosition, TargetPosition);
MotorStraight(1, 1);

TargetPosition = 1400;
MotorTargPosSlide(TargetPosition, TargetPosition);
MotorSlide(1);
while (frontrightdrive.getCurrentPosition() < TargetPosition && linearOpMode.opModeIsActive()) {
  telemetry.addTextData('MotorPositionL', String(frontleftdrive.getCurrentPosition()));
  telemetry.addTextData('MotorPositionR', String(frontrightdrive.getCurrentPosition()));
  telemetry.update();
}
MotorSlide(0);
