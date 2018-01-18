/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  while (linearOpMode.opModeIsActive()) {
    telemetry.update();
  }
}
