var RunTimer, x, DriveSpeedL, DriveSpeedR, LiftSpeed;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  RunTimer = elapsedTimeAccess.create_withResolution("SECONDS");
  Initdrivemotor();
  linearOpMode.waitForStart();
  while (RunTimer < 10 && linearOpMode.opModeIsActive()) {
    MotorSpeed(1, 1);
  }
  telemetry.addTextData('RunTimer', String(RunTimer));
  telemetry.update();
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
function motorlifter(LiftSpeed) {
  liftmotor1.setDualPower(LiftSpeed, liftmotor1, LiftSpeed);
  liftmotor1.setDirection("FORWARD");
  liftmotor2.setDualPower(LiftSpeed, liftmotor2, LiftSpeed);
  liftmotor1.setDirection("FORWARD");
}

/**
 * Describe this function...
 */
function Initliftermotor() {
  liftmotor1.setDualMode("RUN_USING_ENCODER", liftmotor2, "RUN_USING_ENCODER");
  liftmotor2.setDirection("REVERSE");
}

/**
 * Describe this function...
 */
function Initdrivemotor() {
  frontrightdrive.setDualMode("RUN_USING_ENCODER", frontleftdrive, "RUN_USING_ENCODER");
  backleftdrive.setDualMode("RUN_USING_ENCODER", backrightdrive, "RUN_USING_ENCODER");
  backrightdrive.setDirection("REVERSE");
  frontrightdrive.setDirection("REVERSE");
}
