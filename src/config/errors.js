export const alertErrors = [
  {
    code: 'P0300',
    fault: 'Random/Multiple Cylinder Misfire Detected',
    description:
      'The engine is not burning fuel in one or more cylinders, causing loss of power and vibrations.',
    severity: 'High',
  },
  {
    code: 'P0335',
    fault: 'Crankshaft Position Sensor Circuit Malfunction',
    description:
      'Incorrect information about the crankshaft position, affecting ignition timing and fuel injection.',
    severity: 'High',
  },
  {
    code: 'C0200',
    fault: 'Anti-lock Brake System (ABS) Malfunction',
    description:
      'The ABS is not working correctly, compromising safety in emergency braking.',
    severity: 'High',
  },
  {
    code: 'P0301',
    fault: 'Cylinder 1 Misfire Detected',
    description:
      'Misfire in cylinder 1, causing loss of power and potential engine damage.',
    severity: 'High',
  },
  {
    code: 'B1900',
    fault: 'Air Bag Circuit Short to Battery',
    description:
      'Short circuit in the airbag system, potentially causing accidental deployment.',
    severity: 'High',
  },
  {
    code: 'U0100',
    fault: 'Lost Communication with ECM/PCM',
    description:
      'Communication error with the engine control module, potentially causing various engine problems.',
    severity: 'High',
  },
  {
    code: 'P0442',
    fault: 'Small Evaporative Leak Detected',
    description: 'A small leak in the evaporative emissions control system.',
    severity: 'Low',
  },
  {
    code: 'P0446',
    fault: 'Evaporative Emission System Vent Control Circuit Malfunction',
    description:
      'Problem with the vent control circuit of the evaporative emissions system.',
    severity: 'Low',
  },
  {
    code: 'P0455',
    fault: 'Large Evaporative Leak Detected',
    description: 'Large leak in the evaporative emissions control system.',
    severity: 'Low',
  },
  {
    code: 'P0705',
    fault: 'Transmission Range Sensor Circuit Malfunction',
    description:
      'Problem with the sensor that indicates the gear the transmission is in. (If applicable to the motorcycle)',
    severity: 'Low',
  },
  {
    code: 'P0110',
    fault: 'Intake Air Temperature Sensor Circuit Malfunction',
    description:
      'Incorrect readings from the intake air temperature sensor, and the air/fuel mixture.',
    severity: 'Low',
  },
  {
    code: 'B1000',
    fault: 'Instrument Panel Warning Lamp Circuit Malfunction',
    description:
      'Problem with the circuit for one of the warning lamps on the instrument panel.',
    severity: 'Low',
  },
  {
    code: 'P0130',
    fault: 'The Oxygen Sensor Circuit Malfunction',
    description:
      'Incorrect readings of the air/fuel mixture, affecting performance and emissions.',
    severity: 'Medium',
  },
  {
    code: 'P0505',
    fault: 'Idle Air Control Valve (IAC) Malfunction',
    description: 'Difficulty maintaining engine idle may cause stalling.',
    severity: 'Medium',
  },
  {
    code: 'P0115',
    fault: 'Engine Coolant Temperature Sensor Circuit Malfunction',
    description:
      'Incorrect engine temperature readings, affecting the air/fuel mixture and overheating protection.',
    severity: 'Medium',
  },
  {
    code: 'P0171',
    fault: 'System Too Lean (Bank 1)',
    description:
      'The air/fuel mixture is too lean, potentially causing engine damage.',
    severity: 'Medium',
  },
  {
    code: 'P0172',
    fault: 'System Too Rich (Bank 1)',
    description:
      'The air/fuel mixture is too rich, potentially causing engine damage and increased emissions.',
    severity: 'Medium',
  },
  {
    code: 'P0420',
    fault: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    description:
      'The catalytic converter is not working efficiently, increasing emissions.',
    severity: 'Medium',
  },
  {
    code: 'P0562',
    fault: 'System Voltage Low',
    description:
      'The charging system is not providing enough voltage, potentially causing electrical problems.',
    severity: 'Medium',
  },
];
