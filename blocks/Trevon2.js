var hue, _7BcolorVariable_7D, sat, val, colorHSV;

/**
 * This function is executed when this Op Mode is selected from the Driver Station.
 */
function runOpMode() {
  linearOpMode.waitForStart();
  while (linearOpMode.opModeIsActive()) {
    colorHSV = colorAccess.argbToColor(JewelcolorsensorasLynxI2cColorRangeSensor.getAlpha(), JewelcolorsensorasLynxI2cColorRangeSensor.getRed(), JewelcolorsensorasLynxI2cColorRangeSensor.getGreen(), JewelcolorsensorasLynxI2cColorRangeSensor.getBlue());
    hue = colorAccess.getHue(colorHSV);
    telemetry.addNumericData('Hue', hue);
    if (hue < 30) {
      telemetry.addTextData('Color', String('Red'));
    } else if (hue < 225) {
      telemetry.addTextData('Color', String('Blue'));
    } else {
      telemetry.addTextData('Color', String('who knows '));
    }
    telemetry.update();
  }
}
